import crypto from "crypto";
import { prisma } from "../lib/prisma";
import { uploadToIPFS, downloadFromIPFS } from "./ipfs.service";
import { encryptBuffer, decryptBuffer } from "../utils/encryption";



export async function uploadRecord(
  fileBuffer: Buffer,
  filename: string,
  patientId: number
) {

  const encryptedBuffer = encryptBuffer(fileBuffer);


  const cid = await uploadToIPFS(encryptedBuffer);


  const hash = crypto
    .createHash("sha256")
    .update(encryptedBuffer)
    .digest("hex");

  const record = await prisma.record.create({
    data: {
      filename,
      cid,
      hash,
      patientId
    }
  });

  return record;
}

export async function downloadRecord(
  recordId: number,
  userId: number
) {
  const record = await prisma.record.findUnique({
    where: { id: recordId }
  });

  if (!record) {
    throw new Error("Record not found");
  }

  const encryptedBuffer = await downloadFromIPFS(record.cid);

  const newHash = crypto
    .createHash("sha256")
    .update(encryptedBuffer)
    .digest("hex");

  if (newHash !== record.hash) {
    throw new Error("File tampered");
  }

  const decrypted = decryptBuffer(encryptedBuffer);

  return {
    buffer: decrypted,
    filename: record.filename
  };
}

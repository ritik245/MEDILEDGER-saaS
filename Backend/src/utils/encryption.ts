import crypto from "crypto";

const key = crypto
  .createHash("sha256")
  .update(process.env.FILE_SECRET || "kartik_secret")
  .digest();

export function encryptBuffer(buffer: Buffer): Buffer {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  const encrypted = Buffer.concat([
    cipher.update(buffer),
    cipher.final()
  ]);


  return Buffer.concat([iv, encrypted]);
}
export function decryptBuffer(buffer: Buffer): Buffer {
  const iv = buffer.subarray(0, 16);
  const encryptedData = buffer.subarray(16);

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

  return Buffer.concat([
    decipher.update(encryptedData),
    decipher.final()
  ]);
}

export function hashBuffer(buffer: Buffer): string {
  return crypto
    .createHash("sha256")
    .update(buffer)
    .digest("hex");
}

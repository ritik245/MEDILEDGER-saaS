import  fs from "fs";
import { prisma } from "../lib/prisma";
import { encryptFile,hashFile } from "../utils/encryption";

export async function uploadRecord(filePath:string,patientId:number){
    const encryptedPath=filePath+".enc";

    //encrypt
    await encryptFile(filePath,encryptedPath);
    //hash
    const hash= await hashFile(encryptedPath);

    //delete the original
    fs.unlinkSync(filePath);
    //savve in db
    const record=await prisma.record.create({
        data:{
            cid:encryptedPath,
            hash,
            patientId,
        },
    });
    return record;
}
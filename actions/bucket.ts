"use server";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl as getS3SignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto"
const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex")

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getSignedURL(type: string, size: number, checksum: string) {
  const putObjectCommand = new PutObjectCommand({
    Key: generateFileName(),
    Bucket: process.env.AWS_BUCKET_NAME!,
    ContentType: type,
    ContentLength: size,
    ChecksumSHA256: checksum,
  });

  const signedUrl = await getS3SignedUrl(s3, putObjectCommand, {
    expiresIn: 60,
  });
  return { success: { url: signedUrl } };
}
export async function deleteObject(url:string) {
  const deleteObjectCommand = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: url.split('/').pop()!
  });

  s3.send(deleteObjectCommand)
  
  return { success: { message: "done" } };
}





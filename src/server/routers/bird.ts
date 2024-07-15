import { router } from "../trpc"
import { publicProcedure, protectedProcedure } from "../trpc"
import { S3Client } from "@aws-sdk/client-s3"
import { createPresignedPost } from "@aws-sdk/s3-presigned-post"
import { v4 as uuidv4 } from "uuid"

const UPLOAD_MAX_FILE_SIZE = 1000000
const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME ?? "defaultbucketName"

const s3Client = new S3Client({
    region: "us-east-2",
    endpoint: "http://localhost:9000",
    forcePathStyle: true,
    credentials: {
        accessKeyId: "S3RVER",
        secretAccessKey: "S3RVER"
    }
})

export const BirdRouter = router({
    createPresignedUrl: protectedProcedure
    .mutation(async ({ctx}) => {
        const imageId = uuidv4();

        return createPresignedPost(s3Client, {
            Bucket: bucketName,
            Key: imageId,
            Fields: {
                key: imageId
            },
            Conditions: [
                ["starts-with", "$Content-Type", "image/"],
                ["content-length-range", 0, UPLOAD_MAX_FILE_SIZE]
            ]
        })
    }),

})
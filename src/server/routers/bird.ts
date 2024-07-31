import { router } from "../trpc";
import { publicProcedure, protectedProcedure } from "../trpc";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { v4 as uuidv4 } from "uuid";
import { getbirdDescription } from "@/app/api/openai";
import { z } from "zod";
import { db } from "@/app/lib/db";

const UPLOAD_MAX_FILE_SIZE = 1000000;
const bucketName =
  process.env.NEXT_PUBLIC_S3_BUCKET_NAME ?? "defaultbucketName";
const s3Id = process.env.S3_ACCESS_KEY ?? "";
const s3Key = process.env.S3_SECRET_KEY ?? "";

const s3Client = new S3Client({
  region: "us-east-2",
  forcePathStyle: true,
  credentials: {
    accessKeyId: s3Id,
    secretAccessKey: s3Key,
  },
});

export const BirdRouter = router({
  createPresignedUrl: protectedProcedure.mutation(async ({ ctx }) => {
    const imageId = uuidv4();

    return createPresignedPost(s3Client, {
      Bucket: bucketName,
      Expires: 3600,
      Key: imageId,
      Fields: {
        key: imageId,
      },
      Conditions: [["content-length-range", 0, UPLOAD_MAX_FILE_SIZE]],
    });
  }),

  birdDescription: protectedProcedure
    .input(
      z.object({
        image_url: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const result = await getbirdDescription(input.image_url);
      if (!result) {
        throw new Error("Failed to get bird description");
      }

      return result
    }),

  addBirdToNest: protectedProcedure //placeholder for now, need to use after getting the bird description
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        image_url: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const addBird = await db.birds.create({
        data: {
          name: input.name,
          description: input.description,
          imageUrl: input.image_url,
          userId: ctx.session?.user.id
        }
      });
      if (addBird){
        return { success: true }
      }
      else {
        return { success: false }
      }
    }),
    getUserBirds: protectedProcedure.query(async ({ ctx }) => {
        const birds = await db.birds.findMany({
          where: {
            userId: ctx.session?.user.id
          }
        })
        return birds

    }),
});

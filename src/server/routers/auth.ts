import { db } from "@/app/lib/db";
import { z } from "zod"
import { publicProcedure } from "../trpc";
import { router } from "../trpc";
import { Prisma } from "@prisma/client"
import { TRPCError } from "@trpc/server";


export const AuthRouter = router({
    
    getUser: publicProcedure.input(
        z.object({
            googleUserId: z.string(),
        }),
    ).query(async ({ input }) => {
        console.log("getUser procedure called with:", input.googleUserId)
        try {
            const user = await db.user.findFirst({
                where: {
                    googleUserId: input.googleUserId
                }
            });
    
            return user ?? null; // Ensure a null is returned if no user is found
        } catch (error) {
            console.error("Failed to fetch user:", error);
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to process the request',
            });
        }
    }),

    addUser: publicProcedure.input(
        z.object({
            id: z.string(),
            email: z.string(),
            name: z.string(),
            googleUserId: z.string(),
        })
    )
    .mutation(async ({ input }) => {
        const user = await db.user.create({
            data: {
                id: input.id,
                email: input.email,  
                name: input.name,                 
                googleUserId: input.googleUserId,            
            }
        })
        return user
    })
    

});


import { db } from "@/app/lib/db";
import { z } from "zod";
import { protectedProcedure, publicProcedure } from "../trpc";
import { router } from "../trpc";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { getSession } from "@/app/lib/auth";
import { lucia } from "@/app/lib/auth";
import cookie from "cookie";

export const AuthRouter = router({
  getUser: publicProcedure
    .input(
      z.object({
        googleUserId: z.string(),
      })
    )
    .query(async ({ input }) => {
      console.log("getUser procedure called with:", input.googleUserId);
      try {
        const user = await db.user.findFirst({
          where: {
            googleUserId: input.googleUserId,
          },
        });

        return user ?? null; // Ensure a null is returned if no user is found
      } catch (error) {
        console.error("Failed to fetch user:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to process the request",
        });
      }
    }),

  addUser: publicProcedure
    .input(
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
        },
      });
      return user;
    }),

  readUserSession: protectedProcedure.query(async ({ ctx }) => {
    const session = await getSession(ctx.req); // Ensure you have access to req in your context setup
    if (!session) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "No active session found",
      });
    }
    return session;
  }),

  logout: publicProcedure.mutation(async ({ ctx }) => {
    // Assuming ctx.session or similar contains your session management logic
    if (!ctx.session || !ctx.session.user) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "No active session to logout from.",
      });
    }
    // Perform the logout logic, e.g., invalidate the session token
    await lucia.invalidateSession(ctx.session.user.id); // This function should handle session token invalidation

    const sessionCookie = lucia.createBlankSessionCookie();
    ctx.res.setHeader(
      "Set-Cookie",
      cookie.serialize(sessionCookie.name, "", {
        ...sessionCookie.attributes,
        maxAge: -1, // Set maxAge to -1 to instruct the browser to delete the cookie
      })
    );

    return { success: true, message: "Logged out successfully" };
  }),
});

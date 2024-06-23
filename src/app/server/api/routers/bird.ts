import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { env } from "../../../utils/env.mjs";

export const birdRouter = createTRPCRouter({
  getBird: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        id: input.id,
      };
    }),
});

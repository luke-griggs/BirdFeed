import { createTRPCRouter } from "./trpc";
import { birdRouter } from "./routers/bird";

export const appRouter = createTRPCRouter({
    bird: birdRouter,
});
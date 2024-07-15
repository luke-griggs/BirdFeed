import { AuthRouter } from './routers/auth';
import { BirdRouter } from './routers/bird';
import { router } from './trpc';

export const appRouter = router({
    auth: AuthRouter,
    bird: BirdRouter,
})

export type AppRouter = typeof appRouter
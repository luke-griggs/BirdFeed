import { AuthRouter } from './routers/auth';
import { router } from './trpc';

export const appRouter = router({
    auth: AuthRouter,
})

export type AppRouter = typeof appRouter
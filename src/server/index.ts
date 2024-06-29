import { publicProcedure, router } from './trpc';
import { db } from '@/app/lib/db';
import { z } from 'zod'

export const appRouter = router({
    userList: publicProcedure.query(async () => {
        const users = await db.user.findMany();

        return users
    })
});

export type AppRouter = typeof appRouter
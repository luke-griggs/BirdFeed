import { TRPCError, initTRPC } from '@trpc/server'
import { Context } from './context'

const t = initTRPC.context<Context>().create()

export const router = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(function isAuthed(opts) {
    if (!opts.ctx.session?.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
        });
      }
      return opts.next({
        ctx: {
          // Infers the `session` as non-nullable
          session: opts.ctx.session,
        },
      }); 
})
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getSession } from 'next-auth/react';
import { validateRequest } from '@/app/lib/auth';
 
/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/v11/context
 */
export async function createContext(opts: CreateNextContextOptions) {
  const session = await validateRequest(opts.req);
 
  return {
    session,
  };
}
 
export type Context = Awaited<ReturnType<typeof createContext>>;
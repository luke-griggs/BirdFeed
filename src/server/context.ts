import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { validateRequest } from '@/app/lib/auth';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/v11/context
 */
export async function createContext({ req, res }: CreateNextContextOptions) {
  const session = await validateRequest(req);

  // Including req and res in the context to allow full flexibility in procedures
  return {
    req,
    res,
    session,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
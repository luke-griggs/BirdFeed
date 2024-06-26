import { createNextApiHandler } from '@trpc/server/adapters/next';
import { createContext } from '@/server/context';
import { appRouter } from '@/server/index';


export default createNextApiHandler({
  router: appRouter,
  createContext,
});
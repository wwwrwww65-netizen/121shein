import { initTRPC } from '@trpc/server';
import { PrismaClient } from '@repo/db';

export const createContext = async () => {
  return {
    prisma: new PrismaClient(),
  };
};

const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

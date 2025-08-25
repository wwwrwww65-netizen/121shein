import { initTRPC, TRPCError } from '@trpc/server';
import { PrismaClient } from '@repo/db';
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  userId: string;
  role: 'USER' | 'ADMIN';
}

export const createContext = async ({ req }: CreateExpressContextOptions) => {
  const prisma = new PrismaClient();

  const getUserFromHeader = () => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET || 'your-default-secret'
        ) as DecodedToken;
        return decoded;
      } catch (err) {
        return null;
      }
    }
    return null;
  };

  const user = getUserFromHeader();

  return {
    prisma,
    user,
  };
};

const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

const isAuthenticated = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      // infers the `user` as non-nullable
      user: ctx.user,
    },
  });
});

const isAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.user || ctx.user.role !== 'ADMIN') {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthenticated);
export const adminProcedure = t.procedure.use(isAdmin);

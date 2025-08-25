import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TRPCError } from '@trpc/server';

const saltRounds = 10;

export const authRouter = router({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      });

      if (existingUser) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User with this email already exists.',
        });
      }

      const passwordHash = await bcrypt.hash(input.password, saltRounds);

      const user = await ctx.prisma.user.create({
        data: {
          email: input.email,
          name: input.name,
          passwordHash,
        },
      });

      return {
        status: 'success',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      };
    }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User with this email not found.',
        });
      }

      const isPasswordValid = await bcrypt.compare(
        input.password,
        user.passwordHash
      );

      if (!isPasswordValid) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid password.',
        });
      }

      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET || 'your-default-secret',
        { expiresIn: '7d' }
      );

      return {
        status: 'success',
        token,
      };
    }),
});

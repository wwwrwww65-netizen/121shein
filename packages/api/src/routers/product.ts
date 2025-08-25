import { publicProcedure, router } from '../trpc';
import { z } from 'zod';

export const productRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.product.findMany({
      include: {
        categories: true,
      },
    });
  }),
  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.prisma.product.findUnique({
      where: {
        id: input,
      },
      include: {
        categories: true,
        variants: true,
        reviews: true,
      },
    });
  }),
});

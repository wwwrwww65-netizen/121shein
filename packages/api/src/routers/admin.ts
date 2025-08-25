import { adminProcedure, router } from '../trpc';

export const adminRouter = router({
  getStats: adminProcedure.query(async ({ ctx }) => {
    const userCount = await ctx.prisma.user.count();
    const productCount = await ctx.prisma.product.count();
    const orderCount = await ctx.prisma.order.count();

    return {
      users: userCount,
      products: productCount,
      orders: orderCount,
    };
  }),
});

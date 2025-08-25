import { adminProcedure, router } from '../trpc';
import { z } from 'zod';

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

  createProduct: adminProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        price: z.number().positive(),
        images: z.array(z.string()).optional().default([]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.prisma.product.create({
        data: {
          name: input.name,
          description: input.description,
          price: input.price,
          images: input.images,
        },
      });
      return product;
    }),

  updateProduct: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        price: z.number().positive().optional(),
        images: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      const product = await ctx.prisma.product.update({
        where: { id },
        data,
      });
      return product;
    }),

  deleteProduct: adminProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: id }) => {
      // In a real app, you might want to soft-delete or check for dependencies (e.g., existing orders)
      await ctx.prisma.product.delete({
        where: { id },
      });
      return { success: true };
    }),

  getAllOrders: adminProcedure.query(async ({ ctx }) => {
    return ctx.prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }),

  updateOrderStatus: adminProcedure
    .input(
      z.object({
        orderId: z.string(),
        status: z.enum([
          'PENDING',
          'PROCESSING',
          'SHIPPED',
          'DELIVERED',
          'CANCELED',
        ]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { orderId, status } = input;
      const updatedOrder = await ctx.prisma.order.update({
        where: { id: orderId },
        data: { status },
      });
      return updatedOrder;
    }),
});

import { protectedProcedure, router } from '../trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

const addressInput = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  zip: z.string().min(1),
  country: z.string().min(1),
});

export const checkoutRouter = router({
  createOrder: protectedProcedure
    .input(
      z.object({
        shippingAddress: addressInput,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx.user;
      const { shippingAddress } = input;

      const cart = await ctx.prisma.cart.findUnique({
        where: { userId },
        include: { items: { include: { product: true } } },
      });

      if (!cart || cart.items.length === 0) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Cart is empty.',
        });
      }

      // Calculate total on the backend to ensure price integrity
      const total = cart.items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );

      // Use a transaction to ensure all operations succeed or none do
      const order = await ctx.prisma.$transaction(async (prisma) => {
        // 1. Create the address record
        const address = await prisma.address.create({
          data: {
            ...shippingAddress,
            userId,
          },
        });

        // 2. Create the order
        const newOrder = await prisma.order.create({
          data: {
            userId,
            total,
            shippingAddressId: address.id,
            billingAddressId: address.id, // Using same for simplicity
            items: {
              create: cart.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.product.price, // Store price at time of purchase
              })),
            },
          },
        });

        // 3. Delete the user's cart items and the cart itself
        await prisma.cartItem.deleteMany({
          where: { cartId: cart.id },
        });
        await prisma.cart.delete({
          where: { id: cart.id },
        });

        return newOrder;
      });

      return { orderId: order.id, success: true };
    }),

  getOrderById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: orderId }) => {
      const { userId } = ctx.user;

      const order = await ctx.prisma.order.findUnique({
        where: { id: orderId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
          shippingAddress: true,
        },
      });

      if (!order) {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      if (order.userId !== userId) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

      return order;
    }),
});

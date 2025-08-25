import { protectedProcedure, router } from '../trpc';
import { z } from 'zod';

export const cartRouter = router({
  getCart: protectedProcedure.query(async ({ ctx }) => {
    const userCart = await ctx.prisma.cart.findUnique({
      where: { userId: ctx.user.userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!userCart) {
      // If user has no cart, create one
      return ctx.prisma.cart.create({
        data: {
          userId: ctx.user.userId,
        },
        include: { items: true },
      });
    }
    return userCart;
  }),

  addItem: protectedProcedure
    .input(z.object({ productId: z.string(), quantity: z.number().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const { productId, quantity } = input;

      const cart = await ctx.prisma.cart.upsert({
        where: { userId: ctx.user.userId },
        update: {},
        create: { userId: ctx.user.userId },
      });

      const existingItem = await ctx.prisma.cartItem.findFirst({
        where: { cartId: cart.id, productId },
      });

      if (existingItem) {
        return ctx.prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + quantity },
        });
      } else {
        return ctx.prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId,
            quantity,
          },
        });
      }
    }),

  updateItemQuantity: protectedProcedure
    .input(z.object({ productId: z.string(), quantity: z.number().min(0) }))
    .mutation(async ({ ctx, input }) => {
      const { productId, quantity } = input;
      const cart = await ctx.prisma.cart.findUnique({ where: { userId: ctx.user.userId } });
      if (!cart) throw new Error("Cart not found");

      if (quantity === 0) {
        return ctx.prisma.cartItem.deleteMany({ where: { cartId: cart.id, productId } });
      }

      return ctx.prisma.cartItem.updateMany({
        where: { cartId: cart.id, productId },
        data: { quantity },
      });
    }),

  removeItem: protectedProcedure
    .input(z.object({ productId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { productId } = input;
      const cart = await ctx.prisma.cart.findUnique({ where: { userId: ctx.user.userId } });
      if (!cart) throw new Error("Cart not found");

      return ctx.prisma.cartItem.deleteMany({
        where: {
          cartId: cart.id,
          productId,
        },
      });
    }),

  mergeCarts: protectedProcedure
    .input(z.array(z.object({ productId: z.string(), quantity: z.number().min(1) })))
    .mutation(async ({ ctx, input: localCartItems }) => {
      const userCart = await ctx.prisma.cart.upsert({
        where: { userId: ctx.user.userId },
        update: {},
        create: { userId: ctx.user.userId },
        include: { items: true },
      });

      for (const localItem of localCartItems) {
        const existingDbItem = userCart.items.find(
          (item) => item.productId === localItem.productId
        );

        if (existingDbItem) {
          // If item exists in DB cart, update its quantity (e.g., sum them up)
          await ctx.prisma.cartItem.update({
            where: { id: existingDbItem.id },
            data: { quantity: existingDbItem.quantity + localItem.quantity },
          });
        } else {
          // If item does not exist in DB cart, create it
          await ctx.prisma.cartItem.create({
            data: {
              cartId: userCart.id,
              productId: localItem.productId,
              quantity: localItem.quantity,
            },
          });
        }
      }
      return { success: true };
    }),
});

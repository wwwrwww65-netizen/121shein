import { router } from './trpc';
import { healthRouter } from './routers/health';
import { productRouter } from './routers/product';
import { authRouter } from './routers/auth';
import { adminRouter } from './routers/admin';
import { cartRouter } from './routers/cart';

export const appRouter = router({
  health: healthRouter,
  product: productRouter,
  auth: authRouter,
  admin: adminRouter,
  cart: cartRouter,
});

export type AppRouter = typeof appRouter;

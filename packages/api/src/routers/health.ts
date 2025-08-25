import { publicProcedure, router } from '../trpc';

export const healthRouter = router({
  check: publicProcedure.query(() => {
    return { status: 'ok' };
  }),
});

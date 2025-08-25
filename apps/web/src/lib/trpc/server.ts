import {
  createTRPCProxyClient,
  httpBatchLink,
} from '@trpc/client';
import { AppRouter } from '@repo/api/src/router';

export const trpcServer = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/trpc',
    }),
  ],
});

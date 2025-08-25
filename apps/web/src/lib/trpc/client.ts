import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@repo/api/src/router';

export const trpc = createTRPCReact<AppRouter>();

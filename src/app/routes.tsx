import type { RouteObject } from 'react-router';

import { RouteErrorBoundary } from '@/components/errors/route-error-boundary';

export const routes: RouteObject[] = [
  {
    path: '/',
    lazy: async () => {
      const { Root } = await import('@/routes/root/root');
      return {
        Component: Root,
        ErrorBoundary: RouteErrorBoundary,
      };
    },
  },
  {
    path: '*',
    lazy: async () => {
      const { NotFound } = await import('@/routes/errors/not-found');
      return {
        Component: NotFound,
        ErrorBoundary: RouteErrorBoundary,
      };
    },
  },
];

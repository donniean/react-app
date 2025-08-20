import type { RouteObject } from 'react-router';

import { RouteErrorBoundary } from '@/components/errors/route-error-boundary';

function createRoutes(routes: RouteObject[]): RouteObject[] {
  return routes.map((route) => ({
    // https://github.com/remix-run/react-router/issues/12563#issuecomment-2888614210
    HydrateFallback: () => null,
    ...route,
  }));
}

export const routes = createRoutes([
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
    path: '/errors',
    children: [
      {
        path: 'not-found',
        lazy: async () => {
          const { NotFound } = await import('@/routes/errors/not-found');
          return {
            Component: NotFound,
            ErrorBoundary: RouteErrorBoundary,
          };
        },
      },
    ],
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
]);

import { createBrowserRouter, RouterProvider } from 'react-router';

import { RouteErrorBoundary } from '@/components/errors/route-error-boundary';

const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const res = await import('@/routes/root/root');
      return {
        Component: res.Root,
        ErrorBoundary: RouteErrorBoundary,
      };
    },
  },
  {
    path: '*',
    lazy: async () => {
      const { NotFoundRoute } = await import('@/routes/not-found');
      return { Component: NotFoundRoute };
    },
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}

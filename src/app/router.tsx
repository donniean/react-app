import { createBrowserRouter, RouterProvider } from 'react-router';

import { RouteErrorBoundary } from '@/components/errors/route-error-boundary';

const router = createBrowserRouter([
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
      const { NotFoundRoute } = await import('@/routes/errors/not-found');
      return {
        Component: NotFoundRoute,
        ErrorBoundary: RouteErrorBoundary,
      };
    },
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}

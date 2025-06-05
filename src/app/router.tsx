import { createBrowserRouter, RouterProvider } from 'react-router';

import { RouteErrorFallback } from '@/components/errors/route-error-fallback';

const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const { Root } = await import('@/routes/root/root');
      return {
        Component: Root,
        ErrorBoundary: RouteErrorFallback,
      };
    },
  },
  {
    path: '*',
    lazy: async () => {
      const { NotFoundRoute } = await import('@/routes/errors/not-found');
      return {
        Component: NotFoundRoute,
        ErrorBoundary: RouteErrorFallback,
      };
    },
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}

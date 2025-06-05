import { createBrowserRouter, RouterProvider } from 'react-router';

import { RouteError } from '@/components/errors/route-error';

const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const res = await import('@/routes/root/root');
      return { Component: res.Root, errorElement: <RouteError /> };
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

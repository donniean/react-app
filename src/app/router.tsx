import { createBrowserRouter, RouterProvider } from 'react-router';

import { RouteError } from '@/components/errors/route-error';
import { Root } from '@/routes/root/root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <RouteError />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}

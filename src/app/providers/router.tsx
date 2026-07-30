import { RouterProvider, createRouter } from '@tanstack/react-router';

import { routeTree } from '../routeTree.gen';

const router = createRouter({ routeTree });

export function AppRouter() {
  return <RouterProvider router={router} />;
}

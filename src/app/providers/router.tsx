import { RouterProvider, createRouter } from '@tanstack/react-router';

import { NotFound } from '@/components/errors/not-found';

import { routeTree } from '../routeTree.gen';

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function AppRouter() {
  return <RouterProvider router={router} />;
}

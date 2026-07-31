import { RouterProvider, createRouter } from '@tanstack/react-router';

import { NotFound } from '@/components/errors/not-found';
import { RouteErrorFallback } from '@/components/errors/route-error-fallback';
import { AppLoader } from '@/components/ui/app-loader';
import { queryClient } from '@/lib/react-query';

import { routeTree } from '../routeTree.gen';

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPendingComponent: AppLoader,
  defaultNotFoundComponent: NotFound,
  defaultErrorComponent: RouteErrorFallback,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function AppRouter() {
  return <RouterProvider router={router} />;
}

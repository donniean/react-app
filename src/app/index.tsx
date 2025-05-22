import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'react-router';

import { ErrorBoundaryFallback } from '@/components/errors/error-boundary-fallback';

import { router } from './router';

const queryClient = new QueryClient();

export function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorBoundaryFallback}
      onError={(error, info) => {
        console.error('react-error-boundary error:', error, info);
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

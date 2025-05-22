import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { ReactNode } from 'react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorBoundaryFallback } from '@/components/errors/error-boundary-fallback';

const queryClient = new QueryClient();

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: Readonly<AppProviderProps>) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onError={(error, info) => {
          console.error('react-error-boundary error:', error, info);
        }}
      >
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          {children}
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
}

import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { ReactNode } from 'react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorBoundaryFallback } from '@/components/errors/error-boundary-fallback';

import { AppI18nProvider } from './i18n';

const queryClient = new QueryClient();

export function AppProvider({ children }: Readonly<{ children: ReactNode }>) {
  return (
    // cSpell: ignore unlocalized
    // eslint-disable-next-line lingui/no-unlocalized-strings
    <Suspense fallback={<div>Loading...</div>}>
      <AppI18nProvider>
        <ErrorBoundary
          FallbackComponent={ErrorBoundaryFallback}
          onError={(error, info) => {
            console.error('react-error-boundary error:', error, info);
          }}
        >
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <MantineProvider>{children}</MantineProvider>
          </QueryClientProvider>
        </ErrorBoundary>
      </AppI18nProvider>
    </Suspense>
  );
}

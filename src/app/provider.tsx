import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { PropsWithChildren } from 'react';
import { Suspense } from 'react';

import { AppErrorBoundary } from './error-boundary';
import { AppI18nProvider } from './i18n';

const queryClient = new QueryClient();

export function AppProvider({ children }: Readonly<PropsWithChildren>) {
  return (
    <MantineProvider>
      <Suspense fallback={<div />}>
        <AppI18nProvider>
          <AppErrorBoundary>
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools />
              {children}
            </QueryClientProvider>
          </AppErrorBoundary>
        </AppI18nProvider>
      </Suspense>
    </MantineProvider>
  );
}

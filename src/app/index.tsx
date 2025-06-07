import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';

import { AppLoader } from '@/components/ui/app-loader';
import { env } from '@/config/env';
import { theme } from '@/styles/theme';

import { AppErrorBoundary } from './error-boundary';
import { AppI18nProvider } from './i18n';
import { AppRouter } from './router';

const queryClient = new QueryClient();

export function App() {
  return (
    <MantineProvider theme={theme}>
      <AppI18nProvider>
        <QueryClientProvider client={queryClient}>
          {env.isDevelopment && <ReactQueryDevtools />}
          <AppErrorBoundary>
            <Suspense fallback={<AppLoader />}>
              <AppRouter />
            </Suspense>
          </AppErrorBoundary>
        </QueryClientProvider>
      </AppI18nProvider>
    </MantineProvider>
  );
}

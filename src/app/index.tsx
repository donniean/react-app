import { Suspense } from 'react';

import { AppLoader } from '@/components/ui/app-loader';

import { AppErrorBoundary } from './providers/error-boundary';
import { AppMantineProvider } from './providers/mantine';
import { AppQueryProvider } from './providers/react-query';
import { AppRouter } from './providers/router';

export function App() {
  return (
    <AppMantineProvider>
      <AppQueryProvider>
        <AppErrorBoundary>
          <Suspense fallback={<AppLoader />}>
            <AppRouter />
          </Suspense>
        </AppErrorBoundary>
      </AppQueryProvider>
    </AppMantineProvider>
  );
}

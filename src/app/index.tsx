import { Suspense } from 'react';

import { AppLoader } from '@/components/ui/app-loader';

import { AppErrorBoundary } from './providers/error-boundary';
import { AppI18nProvider } from './providers/i18n';
import { AppMantineProvider } from './providers/mantine';
import { AppQueryProvider } from './providers/react-query';
import { AppRouter } from './providers/router';

export function App() {
  return (
    <AppMantineProvider>
      <AppI18nProvider>
        <AppQueryProvider>
          <AppErrorBoundary>
            <Suspense fallback={<AppLoader />}>
              <AppRouter />
            </Suspense>
          </AppErrorBoundary>
        </AppQueryProvider>
      </AppI18nProvider>
    </AppMantineProvider>
  );
}

import type { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { AppErrorFallback } from '@/components/errors/app-error-fallback';

export function AppErrorBoundary({ children }: Readonly<PropsWithChildren>) {
  return (
    <ErrorBoundary
      FallbackComponent={AppErrorFallback}
      resetKeys={[location.pathname]}
      onError={(error, info) => {
        console.error('react-error-boundary error:', error, info);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

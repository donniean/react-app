import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { PropsWithChildren } from 'react';

import { env } from '@/config/env';
import { queryClient } from '@/lib/react-query';

export function AppQueryProvider({ children }: Readonly<PropsWithChildren>) {
  return (
    <QueryClientProvider client={queryClient}>
      {env.isDevelopment && <ReactQueryDevtools />}
      {children}
    </QueryClientProvider>
  );
}

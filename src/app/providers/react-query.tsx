import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { PropsWithChildren } from 'react';

import { env } from '@/config/env';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // retry: false,
      // staleTime: 5 * 1000,
      // refetchOnMount: false,
      // refetchOnWindowFocus: false,
      // refetchOnReconnect: false,
    },
  },
});

export function AppQueryProvider({ children }: Readonly<PropsWithChildren>) {
  return (
    <QueryClientProvider client={queryClient}>
      {env.isDevelopment && <ReactQueryDevtools />}
      {children}
    </QueryClientProvider>
  );
}

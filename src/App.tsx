import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { router } from 'src/router';
import { ThemeProvider } from 'styled-components';

import { THEME } from '@/constants';
import GlobalStyle from '@/styles/GlobalStyle';
import themes from '@/styles/themes';

const queryClient = new QueryClient();

export function App() {
  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <ThemeProvider theme={themes[THEME]}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

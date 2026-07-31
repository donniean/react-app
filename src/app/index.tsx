import { AppErrorBoundary } from './providers/error-boundary';
import { AppQueryProvider } from './providers/react-query';
import { AppRouter } from './providers/router';

export function App() {
  return (
    <AppQueryProvider>
      <AppErrorBoundary>
        <AppRouter />
      </AppErrorBoundary>
    </AppQueryProvider>
  );
}

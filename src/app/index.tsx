import { AppProvider } from './provider';
import { AppRouter } from './router';

export function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

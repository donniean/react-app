import type { FallbackProps } from 'react-error-boundary';

export function ErrorBoundaryFallback({ error }: Readonly<FallbackProps>) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const message = error?.message;

  const finalMessage = typeof message === 'string' ? message : '';

  return (
    <div role="alert">
      <p>Something went wrong</p>
      <pre>{finalMessage}</pre>
    </div>
  );
}

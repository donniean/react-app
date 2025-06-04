import { Trans } from '@lingui/react/macro';
import type { FallbackProps } from 'react-error-boundary';

export function ErrorBoundaryFallback({ error }: Readonly<FallbackProps>) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const message = error?.message;

  const finalMessage = typeof message === 'string' ? message : '';

  return (
    <div role="alert">
      <p>
        <Trans>Something went wrong</Trans>
      </p>
      <pre>{finalMessage}</pre>
    </div>
  );
}

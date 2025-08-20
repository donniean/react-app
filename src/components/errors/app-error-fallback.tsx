import type { FallbackProps } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

import { env } from '@/config/env';

export function AppErrorFallback({
  error,
  resetErrorBoundary,
}: Readonly<FallbackProps>) {
  const { t } = useTranslation('errors');

  let description = '';
  let stack: string | undefined;

  if (error instanceof Error) {
    description = error.message;
    stack = env.isDevelopment ? error.stack : undefined;
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-y-4">
      <h1>{t('app.title')}</h1>
      {description && <p>{description}</p>}
      {stack && (
        <pre className="max-w-full overflow-auto rounded bg-gray-100 p-4 text-xs">
          <code>{stack}</code>
        </pre>
      )}
      <button type="button" onClick={resetErrorBoundary}>
        {t('app.actions.retry')}
      </button>
    </div>
  );
}

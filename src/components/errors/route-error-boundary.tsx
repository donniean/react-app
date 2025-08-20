import { useTranslation } from 'react-i18next';
import { isRouteErrorResponse, useRouteError } from 'react-router';

import { env } from '@/config/env';

export function RouteErrorBoundary() {
  const error = useRouteError();
  const { t } = useTranslation('errors');

  let description = '';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    const { status, statusText } = error;
    description = `${String(status)} - ${statusText}`;
  } else if (error instanceof Error) {
    description = error.message;
    stack = env.isDevelopment ? error.stack : undefined;
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-y-4">
      <h1>{t('route.title')}</h1>
      {description && <p>{description}</p>}
      {stack && (
        <pre className="max-w-full overflow-auto rounded bg-gray-100 p-4 text-xs">
          <code>{stack}</code>
        </pre>
      )}
    </div>
  );
}

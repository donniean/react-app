import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { type ErrorComponentProps, useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { env } from '@/config/env';

export function RouteErrorFallback({ error }: Readonly<ErrorComponentProps>) {
  const router = useRouter();
  const queryErrorResetBoundary = useQueryErrorResetBoundary();
  const { t } = useTranslation('errors');

  useEffect(() => {
    queryErrorResetBoundary.reset();
  }, [queryErrorResetBoundary]);

  const description = error.message;
  const stack = env.isDevelopment ? error.stack : undefined;

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-y-4">
      <h1>{t(($) => $['route.title'])}</h1>
      {description && <p>{description}</p>}
      {stack && (
        <pre className="max-w-full overflow-auto rounded bg-gray-100 p-4 text-xs">
          <code>{stack}</code>
        </pre>
      )}
      <button
        className="bg-primary hover:bg-primary/90 active:bg-primary/80 cursor-pointer rounded-md px-4 py-2 text-white shadow-sm transition-transform duration-150 active:scale-98"
        type="button"
        onClick={() => {
          void router.invalidate();
        }}
      >
        {t(($) => $['app.actions.retry'])}
      </button>
    </div>
  );
}

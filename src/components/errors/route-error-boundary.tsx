import { Center, Code, Text, Title } from '@mantine/core';
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
    <Center className="flex-col gap-y-4" role="alert">
      <Title order={1}>{t('route.title')}</Title>
      {description && <Text>{description}</Text>}
      {stack && <Code block>{stack}</Code>}
    </Center>
  );
}

import { Trans } from '@lingui/react/macro';
import { Center, Code, Text, Title } from '@mantine/core';
import { isRouteErrorResponse, useRouteError } from 'react-router';

import { isEnvDevelopment } from '@/configs/env';

export function RouteErrorFallback() {
  const error = useRouteError();

  let description = '';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    const { status, statusText } = error;
    description = `${String(status)} - ${statusText}`;
  } else if (error instanceof Error) {
    description = error.message;
    stack = isEnvDevelopment ? error.stack : undefined;
  }

  return (
    <Center className="flex-col gap-y-4" role="alert">
      <Title order={1}>
        <Trans>An unexpected error occurred</Trans>
      </Title>
      {description && <Text>{description}</Text>}
      {stack && <Code block>{stack}</Code>}
    </Center>
  );
}

import { Trans } from '@lingui/react/macro';
import { Button, Center, Code, Text, Title } from '@mantine/core';
import type { FallbackProps } from 'react-error-boundary';

import { env } from '@/config/env';

export function AppErrorFallback({
  error,
  resetErrorBoundary,
}: Readonly<FallbackProps>) {
  let description = '';
  let stack: string | undefined;

  if (error instanceof Error) {
    description = error.message;
    stack = env.isDevelopment ? error.stack : undefined;
  }

  return (
    <Center className="h-screen w-screen flex-col gap-y-4" role="alert">
      <Title order={1}>
        <Trans>Something went wrong</Trans>
      </Title>
      {description && <Text>{description}</Text>}
      {stack && <Code block>{stack}</Code>}
      <Button onClick={resetErrorBoundary}>
        <Trans>Retry</Trans>
      </Button>
    </Center>
  );
}

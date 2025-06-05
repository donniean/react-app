import { Trans } from '@lingui/react/macro';
import { Button, Center, Title } from '@mantine/core';
import { Link } from 'react-router';

export function NotFoundRoute() {
  return (
    <Center className="h-screen w-screen flex-col gap-y-4">
      <Title>
        <Trans>404 - Not Found</Trans>
      </Title>
      <Button component={Link} to="/">
        <Trans>Return to home</Trans>
      </Button>
    </Center>
  );
}

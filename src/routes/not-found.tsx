import { Trans } from '@lingui/react/macro';
import { Box, Title } from '@mantine/core';

export function NotFoundRoute() {
  return (
    <Box>
      <Title>
        <Trans>404 - Not Found</Trans>
      </Title>
    </Box>
  );
}

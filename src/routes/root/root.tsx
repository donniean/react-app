import { Trans } from '@lingui/react/macro';
import { Box, Title } from '@mantine/core';
import { clsx } from 'clsx';

import Logo from '@/assets/images/logo.svg?react';

import styles from './root.module.css';

export function Root() {
  return (
    <Box className="flex flex-col items-center justify-center p-[32px]">
      <Logo className={styles.logo} height={128} width={128} />
      <Title className={clsx('text-5xl', styles.title)} order={1}>
        <Trans>Hello React</Trans>
      </Title>
    </Box>
  );
}

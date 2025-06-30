import { MantineProvider } from '@mantine/core';
import type { PropsWithChildren } from 'react';

import { theme } from '@/styles/mantine.theme';

export function AppMantineProvider({ children }: Readonly<PropsWithChildren>) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}

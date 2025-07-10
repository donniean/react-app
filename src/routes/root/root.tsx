import { Flex, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import Logo from '@/assets/images/logo.svg?react';
import { cn } from '@/utils/cn';

import styles from './root.module.css';

export function Root() {
  const { t } = useTranslation(['common', 'glossary']);

  return (
    <Flex className="flex-col items-center justify-center p-[32px]">
      <Logo className={styles.logo} height={128} width={128} />
      <Title className={cn('text-5xl', 'text-primary')} order={1}>
        {t('hello', {
          ns: 'common',
          entity: t('term.react', { ns: 'glossary' }),
        })}
      </Title>
    </Flex>
  );
}

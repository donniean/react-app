import { useTranslation } from 'react-i18next';

import Logo from '@/assets/images/logo.svg?react';

import styles from './root.module.css';

export function Root() {
  const { t } = useTranslation(['common', 'glossary']);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-y-4 p-8">
      <Logo className={styles.logo} height={128} width={128} />
      <h1 className={'text-primary text-5xl'}>
        {t('hello', {
          ns: 'common',
          entity: t('term.react', { ns: 'glossary' }),
        })}
      </h1>
    </div>
  );
}

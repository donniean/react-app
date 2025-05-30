import { Trans } from '@lingui/react/macro';
import { clsx } from 'clsx';

import Logo from '@/assets/images/logo.svg?react';

import styles from './root.module.css';

export function Root() {
  return (
    <div className="flex flex-col items-center justify-center p-[32px]">
      <Logo className={styles.logo} height={128} width={128} />
      <h1 className={clsx('text-5xl', styles.title)}>
        <Trans>Hello React</Trans>
      </h1>
    </div>
  );
}

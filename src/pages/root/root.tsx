import { clsx } from 'clsx';

import Logo from '@/assets/images/logo.svg?react';

import styles from './root.module.css';

// test

export function Root() {
  return (
    <div className="flex flex-col items-center justify-center p-[32px]">
      <Logo className={styles.logo} height={128} width={128} />
      <h1 className={clsx('text-5xl', styles.title)}>Hello React</h1>
    </div>
  );
}

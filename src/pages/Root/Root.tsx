import clsx from 'clsx';

import { ReactComponent as Logo } from '@/assets/images/logo.svg';

import styles from './Root.module.css';

export function Root() {
  return (
    <div className="flex flex-col justify-center items-center p-[32px]">
      <Logo className={styles.logo} height={128} width={128} />
      <h1 className={clsx('text-5xl', styles.title)}>Hello React</h1>
    </div>
  );
}

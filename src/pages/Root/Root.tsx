import { ReactComponent as Logo } from '@/assets/images/logo.svg';

import styles from './Root.module.scss';

export function Root() {
  return (
    <div className={styles.wrapper}>
      <Logo className={styles.logo} width={128} height={128} />
      <h1 className={styles.title}>Hello React</h1>
    </div>
  );
}

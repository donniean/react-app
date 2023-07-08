import { ReactComponent as Logo } from '@/assets/images/logo.svg';

import styles from './Root.module.css';

export function Root() {
  return (
    <div className={styles.wrapper}>
      <Logo className={styles.logo} height={128} width={128} />
      <h1 className={styles.title}>Hello React</h1>
    </div>
  );
}

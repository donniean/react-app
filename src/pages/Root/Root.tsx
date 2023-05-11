import Logo from '@/assets/images/logo.svg?svgr';

import { Title, Wrapper } from './Root.styles';
import styles from './Root.styles.module.scss';

export function Root() {
  return (
    <Wrapper>
      <Logo className={styles.logo} width={128} height={128} />
      <Title>Hello React</Title>
    </Wrapper>
  );
}

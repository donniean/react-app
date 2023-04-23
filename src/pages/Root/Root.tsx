import Logo from '@/assets/images/logo.svg?svgr';

import { Title, Wrapper } from './Root.styles';

export function Root() {
  return (
    <Wrapper>
      <Logo width={128} height={128} />
      <Title>Hello React</Title>
    </Wrapper>
  );
}

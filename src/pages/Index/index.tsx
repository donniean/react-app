import { Title, Wrapper } from './index.styled';

import Logo from '@/assets/images/logo.svg?svgr';

function Index(): JSX.Element {
  return (
    <Wrapper>
      <Logo width={128} height={128} />
      <Title>Hello React</Title>
    </Wrapper>
  );
}

export default Index;

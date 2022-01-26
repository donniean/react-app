import Logo from '@/assets/images/logo.svg?svgr';

import { Title, Wrapper } from './index.styled';

function Index(): JSX.Element {
  return (
    <Wrapper>
      <Logo width={128} height={128} />
      <Title>Hello React</Title>
    </Wrapper>
  );
}

export default Index;

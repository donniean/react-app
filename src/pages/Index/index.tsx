import './index.css';
import './index.scss';
import './index.less';

import Logo from '@/assets/images/logo.svg?svgr';

import { Title, Wrapper } from './index.styled';

function Index(): JSX.Element {
  return (
    <Wrapper>
      <Logo width={128} height={128} />
      <Title>Hello React</Title>
      <h1 className="a">a</h1>
      <h1 className="b">b</h1>
      <h1 className="c">c</h1>
    </Wrapper>
  );
}

export default Index;

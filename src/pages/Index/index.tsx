import './index.css';
import './index.scss';
import './index.less';

import Logo from '@/assets/images/logo.svg?svgr';

import { Title, Wrapper } from './index.styled';

export default function Index() {
  return (
    <Wrapper>
      <Logo width={128} height={128} />
      <Title>Hello React</Title>
    </Wrapper>
  );
}

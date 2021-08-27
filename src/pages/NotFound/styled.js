import styled from 'styled-components';

import { vw } from '@/styles/helpers';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin-top: ${vw(128)};
  font-size: ${vw(48)};
`;

export { Wrapper, Title };

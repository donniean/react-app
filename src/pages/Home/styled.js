import styled from 'styled-components';

import { vw } from '@/styles/helpers';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${vw(32)};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.color.primary};
  font-size: ${vw(32)};
`;

const Image = styled.img`
  width: ${vw(128)};
  vertical-align: bottom;
`;

export { Wrapper, Title, Image };

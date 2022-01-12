import styled from 'styled-components';

import { Theme } from '@/styles/themes/types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
`;

const Title = styled.h1`
  color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
  font-size: 32px;
`;

export { Title, Wrapper };

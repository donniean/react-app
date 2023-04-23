import styled from 'styled-components';

import { Theme } from '@/styles/themes/types';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
`;

export const Title = styled.h1`
  font-size: 32px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
`;

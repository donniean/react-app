import React from 'react';
import styled from 'styled-components';

import { vw } from '../../assets/styles/helpers';

const Title = styled.h1`
  font-size: ${vw(64)};
`;

function NotFound() {
  return <Title>Not Found</Title>;
}

export default NotFound;

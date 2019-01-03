import React from 'react';
import styled from 'styled-components';

import DocumentTitle from '../../components/DocumentTitle';

import { vw } from '../../assets/styles/helpers';

const Title = styled.h1`
  font-size: ${vw(64)};
`;

function NotFound() {
  return (
    <div>
      <DocumentTitle>404</DocumentTitle>
      <Title>Not Found</Title>
    </div>
  );
}

export default NotFound;

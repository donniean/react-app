import React from 'react';
import styled from 'styled-components';

import Page from '../../components/Page';

function NotFound() {
  const Title = styled.h1``;
  return (
    <Page title="404">
      <Title>Not Found</Title>
    </Page>
  );
}

export default NotFound;

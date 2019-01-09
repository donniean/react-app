import React from 'react';
import styled from 'styled-components';

import Page from '../../components/Page';

import { vw } from '../../styles/helpers';

function NotFound() {
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: ${vw(32)};
  `;

  const Title = styled.h1`
    font-size: ${vw(48)};
  `;

  return (
    <Page title="404">
      <Container>
        <Title>Not Found</Title>
      </Container>
    </Page>
  );
}

export default NotFound;

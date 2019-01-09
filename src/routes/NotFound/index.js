import React from 'react';
import styled from 'styled-components';

import Page from '../../components/Page';
import FlexContainer from '../../components/FlexContainer';

import { vw } from '../../styles/helpers';

const Wrapper = styled(FlexContainer)`
  flex: 1;
  align-items: center;
`;

const Title = styled.h1`
  margin-top: ${vw(128)};
  font-size: ${vw(48)};
`;

function NotFound() {
  return (
    <Page title="404">
      <Wrapper>
        <Title>Not Found</Title>
      </Wrapper>
    </Page>
  );
}

export default NotFound;

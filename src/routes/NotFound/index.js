import React from 'react';
import styled from 'styled-components';

import { vw } from '../../styles/helpers';

import Page from '../../components/Page';
import FlexCol from '../../components/FlexCol';

const Wrapper = styled(FlexCol)`
  flex: 1;
  align-items: center;
`;

const Title = styled.h1`
  margin-top: ${vw(128)};
  font-size: ${vw(48)};
`;

function NotFound({ documentTitle }) {
  return (
    <Page documentTitle={documentTitle}>
      <Wrapper>
        <Title>Not Found</Title>
      </Wrapper>
    </Page>
  );
}

export default NotFound;

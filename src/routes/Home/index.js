import React from 'react';
import styled from 'styled-components';

import { vw } from '../../styles/helpers';

import Page from '../../components/Page';
import FlexCol from '../../components/FlexCol';

import logo from '../../assets/images/logo.png';

const Wrapper = styled(FlexCol)`
  justify-content: center;
  align-items: center;
  padding: ${vw(32)};
`;

const Title = styled.h1`
  font-size: ${vw(32)};
  color: ${props => props.theme.color.primary};
`;

const Image = styled.img`
  width: ${vw(128)};
  vertical-align: bottom;
`;

function Home({ documentTitle }) {
  return (
    <Page documentTitle={documentTitle}>
      <Wrapper>
        <Image src={logo} />
        <Title>Hello React</Title>
      </Wrapper>
    </Page>
  );
}

export default Home;

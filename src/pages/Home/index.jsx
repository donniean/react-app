import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Page from '@/components/Page';

import { vw } from '@/styles/helpers';
import logo from '@/assets/images/logo.svg';

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

function Home({ documentTitle }) {
  return (
    <Page documentTitle={documentTitle}>
      <Wrapper>
        <Image src={logo} />
        <Title>Hello React 0</Title>
      </Wrapper>
    </Page>
  );
}

Home.propTypes = {
  documentTitle: PropTypes.string,
};

Home.defaultProps = {
  documentTitle: '',
};

export default Home;

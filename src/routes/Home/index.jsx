import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { vw } from '@/styles/helpers';
import Page from '@/components/Page';
import logo from '@/assets/images/logo.svg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${vw(32)};
`;

const Title = styled.h1`
  font-size: ${vw(32)};
  color: ${({ theme }) => theme.color.primary};
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

Home.propTypes = {
  documentTitle: PropTypes.string,
};

Home.defaultProps = {
  documentTitle: '',
};

export default Home;

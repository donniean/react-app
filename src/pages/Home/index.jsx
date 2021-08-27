import React from 'react';
import PropTypes from 'prop-types';

import Page from '@/components/Page';

import { Image, Title, Wrapper } from './styled';

import logo from '@/assets/images/logo.svg';

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

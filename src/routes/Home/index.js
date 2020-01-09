import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { css } from 'emotion';

import { u } from '../../styles/helpers';

import Page from '../../components/Page';

import logo from '../../assets/images/logo.svg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${u(32)};
`;

const Title = styled.h1`
  font-size: ${u(32)};
  color: ${props => props.theme.color.primary};
`;

const Image = styled.img`
  width: ${u(128)};
  vertical-align: bottom;
`;

function Home({ documentTitle }) {
  return (
    <Page documentTitle={documentTitle}>
      <Wrapper>
        <Image src={logo} />
        <Title>Hello React</Title>
        <div
          className={css`
            color: #f02;
          `}
        >
          ok
        </div>
      </Wrapper>
    </Page>
  );
}

Home.propTypes = {
  documentTitle: PropTypes.string
};

export default Home;

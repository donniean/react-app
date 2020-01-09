import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useSWR from 'swr';

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

const fetcher = url => fetch(url).then(r => r.json());

function Home({ documentTitle }) {
  const { data, error } = useSWR('/repositories', fetcher);
  console.log(data, error);

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
  documentTitle: PropTypes.string
};

export default Home;

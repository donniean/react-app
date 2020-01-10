import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// TODO: TEST
import useSWR, { mutate } from 'swr';
import request from '../../utils/request';

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
  color: ${({ theme }) => theme.color.primary};
`;

const Image = styled.img`
  width: ${u(128)};
  vertical-align: bottom;
`;

const Button = styled.button`
  border-radius: ${u(12)};
  padding: ${u(24)};
  background-color: ${({ theme }) => theme.color.primary};
  color: #fff;
  cursor: pointer;

  &:active {
    opacity: 0.7;
  }
`;

const fetcher = url =>
  request(url, { method: 'GET' }, { baseURL: 'https://api.github.com' });

function Home({ documentTitle }) {
  const { data, error } = useSWR('/repositories', fetcher);
  console.log('useSWR', data, error);

  return (
    <Page documentTitle={documentTitle}>
      <Wrapper>
        <Image src={logo} />
        <Title>Hello React</Title>
        <Button
          onClick={() => {
            mutate('/repositories');
          }}
        >
          Button
        </Button>
      </Wrapper>
    </Page>
  );
}

Home.propTypes = {
  documentTitle: PropTypes.string
};

export default Home;

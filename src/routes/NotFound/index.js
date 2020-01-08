import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { u } from '../../styles/helpers';

import Page from '../../components/Page';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`;

const Title = styled.h1`
  margin-top: ${u(128)};
  font-size: ${u(48)};
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

NotFound.propTypes = {
  documentTitle: PropTypes.string
};

export default NotFound;

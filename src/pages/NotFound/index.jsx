import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Page from '@/components/Page';

import { vw } from '@/styles/helpers';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
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

NotFound.propTypes = {
  documentTitle: PropTypes.string,
};

NotFound.defaultProps = {
  documentTitle: '',
};

export default NotFound;

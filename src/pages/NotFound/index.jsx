import React from 'react';
import PropTypes from 'prop-types';

import Page from '@/components/Page';

import { Title, Wrapper } from './styled';

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

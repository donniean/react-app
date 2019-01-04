import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

function FlexWrapper({ ...rest }) {
  return <Wrapper {...rest} />;
}

export default FlexWrapper;

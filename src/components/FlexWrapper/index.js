import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

function FlexWrapper({ ...rest }) {
  return <Wrapper {...rest} />;
}

export default FlexWrapper;

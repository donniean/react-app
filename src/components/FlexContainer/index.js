import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

function FlexContainer({ ...rest }) {
  return <Container {...rest} />;
}

export default FlexContainer;

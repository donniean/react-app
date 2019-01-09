import React from 'react';
import styled from 'styled-components';

function FlexWrapper({ ...rest }) {
  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
  `;

  return <Wrapper {...rest} />;
}

export default FlexWrapper;

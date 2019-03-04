import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import sizeMe, { SizeMe, withSize } from 'react-sizeme';

import { Tab as ReactTab } from 'react-tabs';

const StyleTab = styled(ReactTab)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  /* width: 25%; */
  padding: 20px;
`;

function Tab({ index, size, setWidth, children, ...rest }) {
  // console.log(index, size);
  // const { width } = size;

  useEffect(() => {
    // setWidth({ index, width });
  }, []);

  return <StyleTab {...rest}>{children}</StyleTab>;
}

Tab.defaultProps = {};

Tab.propTypes = {};

export default sizeMe()(Tab);

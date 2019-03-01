import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Measure from 'react-measure';
import { SizeMe } from 'react-sizeme';

import { Tab as ReactTab } from 'react-tabs';

const StyleTab = styled(ReactTab)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 25%;
  padding: 20px;
`;

function Tab({ children, ...rest }) {
  const [size, setSize] = useState(null);
  console.log(size);

  return (
    <SizeMe>
      {({ size }) => {
        console.log(size);
        return <StyleTab {...rest}>{children}</StyleTab>;
      }}
    </SizeMe>
  );

  // return <StyleTab {...rest}>{children}</StyleTab>;
}

Tab.defaultProps = {};

Tab.propTypes = {};

export default Tab;

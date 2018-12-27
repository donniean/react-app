import React, { PureComponent } from 'react';
import styled from 'styled-components';

import DocumentTitle from '../../components/DocumentTitle';

import { colorPrimary } from '../../assets/styles/variables';
import { vw } from '../../assets/styles/helpers';

class Main extends PureComponent {
  render() {
    return (
      <div>
        <DocumentTitle>main</DocumentTitle>
        <h1>main</h1>
      </div>
    );
  }
}

export default Main;

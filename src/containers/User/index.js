import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { colorPrimary } from '../../assets/styles/variables';
import { vw } from '../../assets/styles/helpers';

class User extends PureComponent {
  render() {
    console.log(this.props.match);
    return (
      <div>
        <h1>User</h1>
      </div>
    );
  }
}

export default User;

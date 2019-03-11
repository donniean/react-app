import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const Context = createContext();

function Provider({ children, ...rest }) {
  return <Context.Provider value={rest}>{children}</Context.Provider>;
}

Provider.defaultProps = {};

Provider.propTypes = {
  children: PropTypes.node
};

const Consumer = Context.Consumer;

export { Context, Provider, Consumer };

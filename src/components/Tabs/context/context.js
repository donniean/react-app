import React, { createContext } from 'react';
import PropTypes from 'prop-types';

let defaultValue = {};

const setValue = function() {};

const Context = createContext();

function Provider({ children }) {
  return <Context.Provider value={defaultValue}>{children}</Context.Provider>;
}

Provider.defaultProps = {};

Provider.propTypes = {
  children: PropTypes.node
};

const Consumer = Context.Consumer;

export { Context, Provider, Consumer };

import React from 'react';

const loginToken = false;


export default loginContext = React.createContext({
  loginToken, 
  setLoginToken: () => {}
});
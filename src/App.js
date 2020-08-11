import React, { useContext } from 'react';

import Products from './components/Products/Products';
import Auth from './components/Auth';
import { Switch, Route } from 'react-router-dom';
import { AuthContext } from './context/auth-context';
import { ThemeProvider } from '@material-ui/core';
import theme from './components/UI/Theme';

let renderCounter = 0;
const App = props => {
  console.log('[App] rendering... renderCount=', ++renderCounter);
  const authContext = useContext(AuthContext);

  let route = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Route path="/" render={(props) => <Products {...props} />} />
    </Switch>
  );

  return <ThemeProvider theme={theme}>{route}</ThemeProvider>;
};

export default App;

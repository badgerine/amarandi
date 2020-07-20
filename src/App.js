import React, { useContext } from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import Auth from './components/Auth';
import { AuthContext } from './context/auth-context';

let renderCounter = 0;
const App = props => {
  console.log('[App] rendering... renderCount=', ++renderCounter);
  const authContext = useContext(AuthContext);

  return authContext.isAuth ? <Ingredients /> : <Auth />;
};

export default App;

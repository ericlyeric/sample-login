import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from './register/Register';
import Login from './login/Login';
import Home from './home/Home';
import PageNotFound from './PageNotFound';
import { AuthContext } from './context/AuthContext';

const App = () => {
  const { user, setUser, isAuth, setIsAuth } = useContext(
    AuthContext,
  );
  console.log(isAuth);
  return (
    <>
      {user ? (
        <>
          <p>User: {JSON.stringify(user)}</p>
          <p>isAuth: {JSON.stringify(isAuth)}</p>
        </>
      ) : null}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </>
  );
};

export default App;

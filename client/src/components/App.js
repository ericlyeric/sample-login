import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './common/Navbar';
import Register from './register/Register';
import Login from './login/Login';
import Home from './home/Home';
import PageNotFound from '../PageNotFound';

const App = () => {
  return (
    <>
      <Navbar />
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

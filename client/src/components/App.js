import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PublicRoute from '../hocs/PublicRoute';
import PrivateRoute from '../hocs/PrivateRoute';
import Navbar from './common/Navbar';
import Register from './register/Register';
import Login from './login/Login';
import Home from './home/Home';
import Todo from './todos/Todo';
import Admin from './admin/Admin';
import PageNotFound from '../PageNotFound';
import { useAuthContext } from '../context/AuthContext';

const App = () => {
  const { isAuth } = useAuthContext();

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <PublicRoute path="/register">
          <Register />
        </PublicRoute>
        <PublicRoute path="/login">
          <Login />
        </PublicRoute>
        <PrivateRoute path="/todo-list" roles={["user", "admin"]}>
          <Todo />
        </PrivateRoute>
        <PrivateRoute path="/admin" roles={["admin"]}>
          <Admin/>
        </PrivateRoute>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </>
  );
};

export default App;

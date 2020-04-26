import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from './register/Register';
import Login from './login/Login';
import Home from './home/Home';
import PageNotFound from './PageNotFound';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async function () {
      try {
        await fetch('/api/hello')
          .then((res) => res.json())
          .then((hello) => setData(hello));
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1> {data ? data.hello : null}</h1>
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
}

export default App;

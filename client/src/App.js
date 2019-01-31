import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Home from './components/home/Home';
import Layout from './components/layout/Layout';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/"  exact  component={Home} />
        <Route path="/login" component={Login} />
      </Switch>
    );
    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

export default App;

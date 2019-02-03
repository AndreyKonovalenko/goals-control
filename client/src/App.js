import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Login from './components/auth/Login';
import Home from './components/home/Home';
import Layout from './components/layout/Layout';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/' exact component={Home} />
      </Switch>
    );
    return <Layout>{routes}</Layout>;
  }
}

export default withRouter(App);

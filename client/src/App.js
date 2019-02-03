import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Login from './components/auth/Login';
import Main from './components/main/Main';
import Layout from './components/layout/Layout';
import Register from './components/auth/Register';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path='/' exact component={Main} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </Switch>
    );
    return <Layout>{routes}</Layout>;
  }
}

export default withRouter(App);

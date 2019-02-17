import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import Layout from './components/layout/Layout';
import Register from './components/auth/Register';
import Add from './components/add/Add';
import CssBaseline from '@material-ui/core/CssBaseline';
import Calendar from './components/calendar/Calendar';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path='/' exact component={Dashboard} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/add' component={Add} />
        <Route path='/calendar' component={Calendar} />
      </Switch>
    );
    return (
      <React.Fragment>
        <CssBaseline />
        <Layout>{routes}</Layout>
      </React.Fragment>
    );
  }
}

export default withRouter(App);

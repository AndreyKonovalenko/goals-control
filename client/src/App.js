import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import Layout from './components/layout/Layout';
import Register from './components/auth/Register';
import GoalBuilder from './components/goalbuilder/GoalBuilder';
import CssBaseline from '@material-ui/core/CssBaseline';
import Calendar from './components/calendar/Calendar';
import NotFound from './components/notfound/NotFound';
import Welcome from './components/welcome/Welcome';

class App extends Component {
  state = {
    isAuthenticated: false
  }
  render() {
    let routes;
    if (this.state.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/' exact component={Welcome} />
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
          <Route path='/add' exact component={GoalBuilder} />
          <Route path='/calendar' exact component={Calendar} />
          <Route path='/' component={NotFound} />
        </Switch>
      )
    }
    else {
      routes = (
        <Switch>
          <Route path='/' exact component={Welcome} />
          <Route path='/' component={NotFound} />
        </Switch>
      );
    }
    return (
      <React.Fragment>
        <CssBaseline />
        <Layout>{routes}</Layout>
      </React.Fragment>
    );
  }
}

export default withRouter(App);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import Layout from './components/layout/Layout';
import Register from './components/auth/Register';
import GoalBuilder from './components/goalbuilder/GoalBuilder';
import CssBaseline from '@material-ui/core/CssBaseline';
import Calendar from './components/calendar/Calendar';
import NotFound from './components/notfound/NotFound';
import Welcome from './components/welcome/Welcome';

console.log(localStorage);

class App extends Component {
  render() {
    let routes;
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/' exact component={Dashboard} />
          <Route path='/add' exact component={GoalBuilder} />
          <Route path='/calendar' exact component={Calendar} />
          <Route path='/' component={NotFound} />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path='/' exact component={Welcome} />
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
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

App.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(connect(mapStateToProps)(App));

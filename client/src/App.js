import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt_decode';
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
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info ad expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAthenticated

  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    let routes;
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/' exact component={Dashboard} />
          <Route path='/add' exact component={GoalBuilder} />
          <Route path='/login' exact component={Login} />
          <Route path='/calendar' exact component={Calendar} />
          <Route path='/' component={NotFound} />
        </Switch>
      );
    }
    else {
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

export default withRouter(connect(mapStateToProps, { setAuthToken, logoutUser })(App));

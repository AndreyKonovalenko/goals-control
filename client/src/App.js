import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import Layout from './components/layout/Layout';
import Register from './components/auth/Register';
import GoalBuilder from './components/goalBuilder/GoalBuilder';
import CssBaseline from '@material-ui/core/CssBaseline';
import CurrentGoal from './components/currentGoal/CurrentGoal';
import NotFound from './components/notFound/NotFound';
import Welcome from './components/welcome/Welcome';

import { autoLogin } from './store/actions/authActions';

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }
  render() {
    let routes;
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/' exact component={Dashboard} />
          <Route path='/add' exact component={GoalBuilder} />
          <Route path='/login' exact component={Login} />
          <Route path='/goal' exact component={CurrentGoal} />
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
  auth: PropTypes.object.isRequired,
  autoLogin: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { autoLogin }
  )(App)
);

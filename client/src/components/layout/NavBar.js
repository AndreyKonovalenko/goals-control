import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddCircle from '@material-ui/icons/AddCircle';
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';
import { editMode } from '../../store/actions/dashboardActions';
import { logoutUser } from '../../store/actions/authActions';
import { clearErrors } from '../../store/actions/errorsActions';

const styles = theme => {
  const color = theme.palette.primary.contrastText;
  return {
    root: {
      width: '100%',
      zIndex: 10000,
      boxShadow: 'none'
    },
    grow: {
      flexGrow: 1
    },
    toolbar: {
      height: 64,
      [theme.breakpoints.down('xs')]: {
        height: 56 // for screens smaller then 600 use 100%
      }
    },
    label: {
      color: `${color}`,
      fontWeight: 500,
      fontSize: '0.875rem'
    }
  };
};

class NavBar extends Component {
  onClickHandler = (to, event) => {
    event.preventDefault();
    this.props.clearErrors();
    this.props.history.push(to);
  };

  onSwitchHandler = mode => {
    this.props.editMode(mode);
  };
  onLogoutHandler = () => {
    this.props.logoutUser();
    this.props.history.push('/');
  };

  render() {
    const { classes, editing, isAuthenticated } = this.props;
    const edit = (
      <FormControlLabel
        classes={{ label: classes.label }}
        label='EDIT'
        labelPlacement='start'
        // use her location from parent componet work more consistent
        disabled={this.props.mainLocation === '/' ? false : true}
        control={<Switch onChange={() => this.onSwitchHandler(editing)} />}
      />
    );

    const add = (
      <IconButton
        onClick={event => this.onClickHandler('/add', event)}
        color='inherit'
        disabled={this.props.editing ? true : false}
      >
        <AddCircle />
      </IconButton>
    );
    const register = (
      <Button
        onClick={event => this.onClickHandler('/register', event)}
        color='inherit'
      >
        Sign Up
      </Button>
    );
    const login = (
      <Button
        onClick={event => this.onClickHandler('/login', event)}
        color='inherit'
      >
        Login
      </Button>
    );
    const logout = (
      <Button onClick={this.onLogoutHandler} color='inherit'>
        Logout
      </Button>
    );

    return (
      <AppBar className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <Typography color='inherit' className={classes.grow}>
            <Button
              onClick={event => this.onClickHandler('/', event)}
              color='inherit'
            >
              Goals App
            </Button>
          </Typography>
          {isAuthenticated ? edit : null}
          {isAuthenticated ? add : null}
          {!isAuthenticated ? register : null}
          {!isAuthenticated ? login : null}
          {isAuthenticated ? logout : null}
        </Toolbar>
      </AppBar>
    );
  }
}

NavBar.propTypes = {
  editing: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  editMode: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapSateToProps = state => ({
  editing: state.dashboard.editing,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapSateToProps,
  { editMode, logoutUser, clearErrors }
)(withRouter(withStyles(styles)(NavBar)));

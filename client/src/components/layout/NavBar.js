import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
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
      height: 56, // for screens smaller then 600 use 100%
    },
  }
});

class NavBar extends Component {
  onClickHandler = (to, event) => {
    event.preventDefault();
    this.props.history.push(to);
  };

  render() {
    const { classes } = this.props;

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
          <Button
            onClick={event => this.onClickHandler('/test', event)}
            color='inherit'
          >
            Test
          </Button>
          <Button
            onClick={event => this.onClickHandler('/register', event)}
            color='inherit'
          >
            Sign Up
          </Button>
          <Button
            onClick={event => this.onClickHandler('/login', event)}
            color='inherit'
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(withStyles(styles)(NavBar));

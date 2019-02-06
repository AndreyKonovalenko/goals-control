import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
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
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <Typography color='inherit' className={classes.grow}>
              <Button
                onClick={event => this.onClickHandler('/', event)}
                color='inherit'
              >
                Goals - Control App
              </Button>
            </Typography>
            <Button
              onClick={event => this.onClickHandler('/test', event)}
              color='inherit'
            >
              Test material-ui components
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
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(NavBar));

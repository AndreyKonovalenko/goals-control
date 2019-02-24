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
    this.props.history.push(to);
  };

  onSwitchHandler = mode => {
    this.props.editMode(mode);
  };

  render() {
    const { classes, editing } = this.props;

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
          <FormControlLabel
            disabled={
              this.props.history.location.pathname === '/' ? false : true
            }
            classes={{
              label: classes.label
            }}
            control={<Switch onChange={() => this.onSwitchHandler(editing)} />}
            label='EDIT'
            labelPlacement='start'
          />
          <IconButton
            onClick={event => this.onClickHandler('/add', event)}
            color='inherit'
          >
            <AddCircle />
          </IconButton>
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

NavBar.propTypes = {
  editing: PropTypes.bool.isRequired
};

const mapSateToProps = state => ({
  editing: state.dashboard.editing
});

export default connect(
  mapSateToProps,
  { editMode }
)(withRouter(withStyles(styles)(NavBar)));

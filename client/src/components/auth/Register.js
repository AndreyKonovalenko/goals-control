import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../store/actions/authActions';
import { isEmpty } from '../../utils/is-empty';

import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Spinner from '../spinner/Spinner';

const styles = theme => ({
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  root: {
    width: 400,
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('xs')]: {
      width: '100%' // for screens smaller then 600 use 100%,
    },
    backgroundColor: theme.palette.background.paper
  },
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 3
  },
  text: {
    margin: theme.spacing.unit,
    textTransform: 'uppercase'
  }
});

class Register extends Component {
  state = {
    email: '',
    password: '',
    password2: ''
  };
  onChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmitHundler = event => {
    event.preventDefault();
    const newUser = {
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  // Need to adjust butto style
  render() {
    const { classes, errors, loading } = this.props;
    const error = !isEmpty(errors);
    const progress = <Spinner />;
    return (
      <Paper className={classes.root}>
        {loading ? progress : null}
        <form className={classes.container}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            align='center'
            component='h1'
            variant='h6'
            className={classes.text}
          >
            Sing up
          </Typography>
          <TextField
            error={error}
            label={error ? 'Error' : 'Email'}
            helperText={errors.email}
            type='email'
            name='email'
            autoComplete='email'
            onChange={this.onChangeHandler}
            margin='normal'
            fullWidth
            variant='outlined'
          />
          <TextField
            error={error}
            label={error ? 'Error' : 'Password'}
            helperText={errors.password}
            type='password'
            name='password'
            onChange={this.onChangeHandler}
            margin='normal'
            fullWidth
            variant='outlined'
          />
          <TextField
            error={error}
            label={error ? 'Error' : 'Confirm password'}
            helperText={errors.password}
            type='password'
            name='password2'
            onChange={this.onChangeHandler}
            margin='normal'
            fullWidth
            variant='outlined'
          />
          <Button
            type='submit'
            className={classes.button}
            fullWidth
            variant='contained'
            color='primary'
            onClick={this.onSubmitHundler}
          >
            Submit
          </Button>
        </form>
      </Paper>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors,
  loading: state.loading.loading
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withStyles(styles)(Register));

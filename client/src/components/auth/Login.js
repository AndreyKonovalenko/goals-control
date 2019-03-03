import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../store/actions/authActions';
import { isEmpty } from '../../utils/is-empty';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    width: '60%',
    margin: 'auto',
    [theme.breakpoints.down('xs')]: {
      width: '100%' // for screens smaller then 600 use 100%
    },
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    backgroundColor: theme.palette.background.paper
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  text: {
    margin: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    textTransform: 'uppercase'
  },
  progress: {
    margin: theme.spacing.unit * 2,
    width: '100%',
    height: '100%',
    position: 'fixed',
    zIndex: 100,
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
});

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  onChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  onSubmitHundler = event => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData, this.props.history);
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  // <div>
  //   <CircularProgress className={classes.progress} />
  //   <CircularProgress className={classes.progress} color="secondary" />
  // </div>

  render() {
    const { classes, errors } = this.props;
    const { loading } = this.props.loading;
    const error = !isEmpty(errors);
    console.log(loading);
    const progress = (
      <div>
        <CircularProgress className={classes.progress} />
      </div>
    );

    return (
      <Paper className={classes.root}>
        {loading ? progress : null}
        <form className={classes.container}>
          <Typography align='center' variant='h6' className={classes.text}>
            Login
          </Typography>
          <TextField
            className={classes.textField}
            error={error}
            label={error ? 'Error' : 'Email'}
            helperText={errors.email}
            type='email'
            name='email'
            autoComplete='email'
            onChange={this.onChangeHandler}
            margin='none'
            variant='outlined'
          />
          <TextField
            className={classes.textField}
            error={error}
            label={error ? 'Error' : 'Password'}
            helperText={errors.password}
            type='password'
            name='password'
            onChange={this.onChangeHandler}
            margin='normal'
            variant='outlined'
          />
          <Button
            variant='outlined'
            className={classes.button}
            margin='normal'
            onClick={this.onSubmitHundler}
          >
            Submit
          </Button>
        </form>
      </Paper>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  loading: state.loading
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withStyles(styles)(Login));

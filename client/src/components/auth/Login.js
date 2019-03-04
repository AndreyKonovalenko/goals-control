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
import Spinner from '../spinner/Spinner';

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
    if (this.props.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  render() {
    const { classes, errors, loading } = this.props;
    const error = !isEmpty(errors);
    const progress = <Spinner />;

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
  isAuthenticated: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.errors,
  loading: state.loading.loading
});

export default connect(
  mapStateToProps, { loginUser }
)(withStyles(styles)(Login));

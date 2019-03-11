import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../store/actions/authActions';
import { isEmpty } from '../../utils/is-empty';


import Avatar from '@material-ui/core/Avatar';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
      width: '100%' // for screens smaller then 600 use 100%
    },
    backgroundColor: theme.palette.background.paper,

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
          <Avatar className={classes.avatar}>
            <LockOpenOutlinedIcon />
          </Avatar>
          <Typography
            align='center'
            component='h1'
            variant='h6'
            className={classes.text}
          >
            Login
          </Typography>
          <TextField
            fullWidth
            error={error}
            label={error ? 'Error' : 'Email'}
            helperText={errors.email}
            type='email'
            name='email'
            autoComplete='email'
            onChange={this.onChangeHandler}
            margin='normal'
            variant='outlined'
          />
          <TextField
            fullWidth
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
            fullWidth
            className={classes.button}
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../store/actions/authActions';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
  }

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

    console.log(userData, this.props.history);
    this.props.loginUser(userData, this.props.history);
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  render() {
    const { classes, errors } = this.props;
    console.log(errors);
    return (
      <Paper className={classes.root}>
        <form className={classes.container}>
          <Typography align='center' variant='h6' className={classes.text} >
           Login
          </Typography>
          <TextField
            className={classes.textField}
            label='Email'
            type='email'
            name='email'
            autoComplete='email'
            onChange={this.onChangeHandler}
            margin='none'
            variant='outlined'
          />
          <TextField
            className={classes.textField}
            label='Password'
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
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(withStyles(styles)(Login));

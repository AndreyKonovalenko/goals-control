import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    marginTop: '5%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  }
});

class Login extends Component {
  render() {
    const { classes } = this.props;
    return (
      <form className={classes.container}>
        <TextField
          id='outlined-email-input'
          className={classes.textField}
          label='Email'
          type='email'
          name='email'
          autoComplete='email'
          margin='none'
          variant='outlined'
        />
        <TextField
          id='outlined-password-input'
          className={classes.textField}
          label='Password'
          type='password'
          name='password'
          margin='normal'
          variant='outlined'
        />
        <Button
          variant='outlined'
          color='secondary'
          className={classes.button}
          margin='normal'
        >
          Log in
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(Login);

import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
  render() {
    const { classes } = this.props;
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
            margin='none'
            variant='outlined'
          />
          <TextField
            className={classes.textField}
            label='Password'
            type='password'
            name='password'
            margin='normal'
            variant='outlined'
          />
          <Button
            variant='outlined'
            className={classes.button}
            margin='normal'
          >
            Submit
          </Button>
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles)(Login);

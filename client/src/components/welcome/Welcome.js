import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

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
  text: {
    margin: theme.spacing.unit
  }
});
const Welcome = props => {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Typography className={classes.text} align='center' variant='h4'>
        Welcome!{' '}
      </Typography>
      <Typography className={classes.text} align='left' variant='body1'>
        This simple application has created to help you to track your progress
        of your new goal or habit.
      </Typography>
      <Typography className={classes.text} align='left' variant='subtitle1'>
        Please login or create new account to start using it!
      </Typography>
      <Typography className={classes.text} align='left' variant='subtitle1'>
        For your account you can use email as login or any login name your want
        !
      </Typography>
    </Paper>
  );
};

export default withStyles(styles)(Welcome);

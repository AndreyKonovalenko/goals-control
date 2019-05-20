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
        GOALS APP helps you track progress toward your goals.
      </Typography>
      <Typography className={classes.text} align='left' variant='subtitle1'>
        Please login or create new account to start using it.
      </Typography>
    </Paper>
  );
};

export default withStyles(styles)(Welcome);

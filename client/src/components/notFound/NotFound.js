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
    margin: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  }
});
const NotFound = props => {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Typography className={classes.text} align='center' variant='h6'>
        Page Not Found
      </Typography>
      <Typography className={classes.text} align='center' variant='body1'>
        Sorry, this page does not exist!
      </Typography>
    </Paper>
  );
};

export default withStyles(styles)(NotFound);

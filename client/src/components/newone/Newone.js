import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import dateFns from 'date-fns';

const styles = theme => ({
  root: {
    width: '80%',
    margin: 'auto',
    [theme.breakpoints.down('xs')]: {
      width: '100%', // for screens smaller then 600 use 100%
    },
    backgroundColor: theme.palette.background.paper,
  },

  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class Newone extends Component {
  render() {
    const { classes } = this.props;
    const currentDate = dateFns.format(new Date(), 'DD.MM.YYYY');
    console.log(typeof currentDate);
    return (
      <Paper className={classes.root}>
        <Typography
          align='center'
          variant='h6'
        >
          Set up your new gaol
        </Typography>
       <form className={classes.container} noValidate>
          <TextField
            id = "date"
            label = "Start Date"
            type = "date"
            defaultValue={currentDate}
            className = { classes.textField }
            InputLabelProps = { {
            shrink: true,
          }}
        />
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles)(Newone);

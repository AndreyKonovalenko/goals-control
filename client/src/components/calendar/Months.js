import React from 'react';
import dateFns from 'date-fns';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';

const dateFormat = 'MMMM YYYY';

const styles = (theme) => ({
  root: {
    paddingTop: '1%',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});

const Months = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <ChevronLeft aria-label="prev month" color="secondary" onClick={props.prevMonth}/>
      <Typography variant='h6'>{dateFns.format(props.currentMonth, dateFormat)}</Typography>
      <ChevronRight aria-label="next month" color="secondary" onClick={props.nextMonth}/>
    </div>
  );
};

export default withStyles(styles)(Months);

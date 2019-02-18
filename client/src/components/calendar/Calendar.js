import React, { Component } from 'react';
import dateFns from 'date-fns';

import { withStyles } from '@material-ui/core/styles';
import Months from './Months';
//import WeekDays from './WeekDays';
//import Days from './Days';


const styles = (theme) => ({
  root: {
    width: '80%',
    margin: 'auto',
    [theme.breakpoints.down('xs')]: {
      width: '100%', // for screens smaller then 600 use 100%
    },
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    justifyContent: 'center'
  },
});

class Calendar extends Component {
  state = {
    currentMonth: new Date()
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Months
          currentMonth={this.state.currentMonth}
          nextMonth={this.nextMonth}
          prevMonth={this.prevMonth}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Calendar);

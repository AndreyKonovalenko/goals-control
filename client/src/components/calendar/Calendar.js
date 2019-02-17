import React, { Component } from 'react';
import dateFns from 'date-fns';

import Months from './Months';
//import WeekDays from './WeekDays';
//import Days from './Days';

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
    return (
      <div>
        <Months
          currentMonth={this.state.currentMonth}
          nextMonth={this.nextMonth}
          prevMonth={this.prevMonth}
        />
      </div>
    );
  }
}

export default Calendar;

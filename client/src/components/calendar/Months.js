import React from 'react';
import dateFns from 'date-fns';

const dateFormat = 'MMMM YYYY';

const Months = props => (
  <div>
    <div onClick={props.prevMonth} />
    <div>
      <span>{dateFns.format(props.currentMonth, dateFormat)}</span>
    </div>
    <div onClick={props.nextMonth} />
  </div>
);

export default Months;

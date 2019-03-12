const dateFns = require('date-fns');

const daysArrayBuilder = (from, limitation) => {
  limitation = parseInt(limitation, 10);
  let days = [];
  let start = dateFns.parse(from);
  let n = 0;
  while (n < limitation) {
    let currentDay = dateFns.addDays(start, n);
    days.push({
      date: currentDay,
      touched: false,
      success: false
    });
    n++;
  }
  return days;
};


module.exports = daysArrayBuilder;

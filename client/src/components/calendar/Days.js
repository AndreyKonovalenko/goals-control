import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import dateFns from 'date-fns';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const styles = theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gridGap: '1em',
    margin: '0 auto',
    maxWidth: '64em',
    padding: 0,
  },
  text: {
    textAlign: 'center',
    padding: 0
  }

});

class Days extends Component {

  render() {
    const { currentMonth, classes } = this.props;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = dateFns.endOfWeek(monthEnd, { weekStartsOn: 1 });
    const daysRange = dateFns.differenceInDays(endDate, startDate) + 1;
    const daysArr = Array.from({ length: daysRange }, (v, k) => k);

    const days = daysArr.map(day => {
      return (
        <ListItem key={day} className={classes.listItem}>
        <ListItemText classNama={classes.text}>
          {day}
        </ListItemText>
      </ListItem>)
    });
    return (
      <List className={classes.root} disablePadding={true}>
        {days}
      </List>
    );
  }
}

export default withStyles(styles)(Days);
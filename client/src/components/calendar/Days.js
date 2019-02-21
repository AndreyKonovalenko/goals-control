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
    gridGap: '0.5em',
    justifyItems: 'space-between',
    paddingLeft: '0.5em',
    paddingRight: '0.5em',
    paddingBottom: '0.5em'
  },
  item: {
    border: '1px solid #eaeaea;',
    textAlign: 'center',
    borderRadius: '0.5em',
  },
  text: {
    padding: 0
  },

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

    const days = daysArr.map(element => {
      const currentDay = dateFns.addDays(startDate, element);
      return (
        <ListItem key={element} className={classes.item} disableGutters={true}>
          <ListItemText
            className={classes.text}
            primaryTypographyProps={dateFns.isToday(currentDay) ? { variant:'h6', color: 'secondary'} : {variant:'body1'}}
            >
            {dateFns.format(currentDay, 'D')}
          </ListItemText>
        </ListItem>
      );
    });
    return (
      <List className={classes.root} disablePadding={true}>
        {days}
      </List>
    );
  }
}

export default withStyles(styles)(Days);

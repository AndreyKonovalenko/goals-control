import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import dateFns from 'date-fns';

const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    textTransform: 'uppercase'
  },
  text: {
    textAlign: 'center',
    padding: 0
  }
});


const WeekDays = (props) => {
  const { classes } = props;
  const dateFormat = "ddd";
  const startDate = dateFns.startOfWeek(props.currentMonth, { weekStartsOn: 1 });
  const week = Array.from({ length: 7 }, (v, k) => k);

  const weekDays = week.map(day => (
    <ListItem key={day}>
        <ListItemText className={classes.text}>
         {dateFns.format(dateFns.addDays(startDate, day), dateFormat)}
        </ListItemText>
      </ListItem>
  ));

  return (
    <List className={classes.root} disablePadding={true}>
        {weekDays}
      </List>
  );
};

export default withStyles(styles)(WeekDays);

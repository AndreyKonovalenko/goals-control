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
  },
  text: {
    textAlign: 'center',
    padding: 0
  }
});


const WeekDays = (props) => {
  const { classes } = props;
  const days = [];
  let dateFormat = "ddd";
  let startDate = dateFns.startOfWeek(props.currentMonth, { weekStartsOn: 1 });

  for (let i = 0; i < 7; i++) {
    days.push(
      <ListItem key={i}>
        <ListItemText className={classes.text}>
         {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </ListItemText>
      </ListItem>
    );
  }
  return (
    <List className={classes.root} disablePadding={true}>
      {days}
    </List>
  );
};

export default withStyles(styles)(WeekDays);

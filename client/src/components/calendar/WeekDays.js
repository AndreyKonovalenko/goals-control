import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import dateFns from 'date-fns';

const styles = (theme) => ({
  root: {

    [theme.breakpoints.down('xs')]: {
      width: '100%', // for screens smaller then 600 use 100%
    },
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});


const WeekDays = (props) => {
  const { classes } = props;
  const days = [];
  let dateFormat = "dd";
  let startDate = dateFns.startOfWeek(props.currentMonth, { weekStartsOn: 1 });

  for (let i = 0; i < 7; i++) {
    days.push(
      <ListItem key={i}>
        <ListItemText>
         {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </ListItemText>
      </ListItem>
    );
  }
  return (
    <List className={classes.root}>
      {days}
    </List>
  );
};

export default withStyles(styles)(WeekDays);

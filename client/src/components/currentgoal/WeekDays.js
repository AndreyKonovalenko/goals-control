import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import dateFns from 'date-fns';

const styles = theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gridGap: '0.5em',
    justifyItems: 'space-between',
    border: '1px solid #eaeaea;',
    borderRadius: '0.5em',
    marginBottom: '0.5em',
    marginLeft: '0.5em',
    marginRight: '0.5em'
  },
  item: {
    textAlign: 'center'
  },
  text: {
    padding: 0,
    textTransform: 'uppercase'
  }
});

const WeekDays = props => {
  const { classes } = props;
  const dateFormat = 'dd';
  const startDate = dateFns.startOfWeek(props.currentMonth, {
    weekStartsOn: 1
  });
  const week = Array.from({ length: 7 }, (v, k) => k);

  const weekDays = week.map(day => (
    <ListItem key={day} className={classes.item} disableGutters={true}>
      <ListItemText
        className={classes.text}
        primaryTypographyProps={{ variant: 'subtitle1', color: 'secondary' }}
      >
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

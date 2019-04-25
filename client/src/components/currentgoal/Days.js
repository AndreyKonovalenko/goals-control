import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import dateFns from 'date-fns';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import classNames from 'classnames';

import { connect } from 'react-redux';

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
    border: '1px solid #eaeaea',
    textAlign: 'center',
    borderRadius: '0.5em'
  },
  outOfMonth: {
    backgroundColor: theme.palette.background.default
  },
  text: {
    padding: 0
  },
  success: {
    backgroundColor: 'green'
  },
  failed: {
    backgroundColor: 'red'
  },
  clickable: {
    borderWidth: '3px',
    cursor: 'pointer'
  }
});

class Days extends Component {
  onClickHandler = (element, event) => {
    event.preventDefault();
    console.log(element);
  };

  // Need to add function that will check store state

  render() {
    const { currentMonth, classes, currentGoal } = this.props;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = dateFns.endOfWeek(monthEnd, { weekStartsOn: 1 });
    const daysRange = dateFns.differenceInDays(endDate, startDate) + 1;
    const daysArr = Array.from({ length: daysRange }, (v, k) => k);

    const dateArray = this.props.currentGoal.days.map(element =>
      dateFns.format(element.date, 'DD.MM.YYYY')
    );
    console.log(dateArray);

    const days = daysArr.map(element => {
      let elementIndex = null;
      const currentDay = dateFns.addDays(startDate, element);
      const dayVariable = dateFns.format(currentDay, 'DD.MM.YYYY');
      const inGoal = dateArray.includes(dayVariable);

      let styleConfig = classes.item;

      if (currentDay < monthStart || currentDay > monthEnd) {
        styleConfig = classNames(classes.item, classes.outOfMonth);
      }

      if (inGoal) {
        elementIndex = dateArray.indexOf(dayVariable);
        // fro testing logic only

        if (!currentGoal.days[elementIndex].touched) {
          styleConfig = classNames(classes.item, classes.clickable);
        }

        if (
          currentGoal.days[elementIndex].touched &&
          !currentGoal.days[elementIndex].success
        ) {
          styleConfig = classNames(
            classes.item,
            classes.failed,
            classes.clickable
          );
        }
        if (
          currentGoal.days[elementIndex].touched &&
          currentGoal.days[elementIndex].success
        ) {
          styleConfig = classNames(
            classes.item,
            classes.success,
            classes.clickable
          );
        }
      }

      return (
        <ListItem
          key={element}
          onClick={
            inGoal ? event => this.onClickHandler(currentDay, event) : null
          }
          className={styleConfig}
          disableGutters={true}
        >
          <ListItemText
            className={classes.text}
            primaryTypographyProps={
              dateFns.isToday(currentDay) ? { color: 'secondary' } : null
            }
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

const mapSateToProps = state => ({
  currentGoal: state.currentGoal.currentGoal
});

export default connect(mapSateToProps)(withStyles(styles)(Days));

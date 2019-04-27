import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import dateFns from 'date-fns';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import classNames from 'classnames';

import { connect } from 'react-redux';

import { checkUpGoalDay } from '../../store/actions/currentGoalActions';

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
  onClickHandler = (date, event) => {
    event.preventDefault();
    date = dateFns.format(date, 'DD.MM.YYYY');
    console.log('income date', date);
    // Need to update income date to find index of arry!!!!
    const dayIndex = this.props.currentGoal.days.find((element, index) => {
      if (element.date === date) {
        console.log(index);
        return index;
      } else {
        return null;
      }
    });
    if (dayIndex !== null) {
      this.props.checkUpGoalDay(dayIndex, this.props.currentGoal.days);
    }
    console.log(date);
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

    const dateArray = this.props.currentGoal.days.map(element => element.date);
    console.log(dateArray);

    const days = daysArr.map(element => {
      let elementIndex = null;
      const currentDay = dateFns.addDays(startDate, element);
      const dayVar = dateFns.format(currentDay, 'DD.MM.YYYY');
      const inGoal = dateArray.includes(dayVar);
      console.log(dayVar);
      let styleConfig = classes.item;

      if (currentDay < monthStart || currentDay > monthEnd) {
        styleConfig = classNames(classes.item, classes.outOfMonth);
      }

      if (inGoal) {
        elementIndex = dateArray.indexOf(dayVar);
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

export default connect(
  mapSateToProps,
  { checkUpGoalDay }
)(withStyles(styles)(Days));

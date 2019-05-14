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
    justifyItems: 'space-between',
    gridGap: '8px',
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  item: {
    border: '1px solid #eaeaea',
    textAlign: 'center',
    borderRadius: theme.spacing.unit
  },
  outOfMonth: {
    backgroundColor: theme.palette.background.default
  },
  text: {
    padding: 0
  },
  success: {
    backgroundColor: '#7cb342'
  },
  failed: {
    backgroundColor: '#f44336'
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
    this.props.currentGoal.days.forEach((element, index) => {
      if (element.date === date) {
        this.props.checkUpGoalDay(index, this.props.currentGoal.days);
      }
    });
  };

  render() {
    const { currentMonth, classes, currentGoal } = this.props;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = dateFns.endOfWeek(monthEnd, { weekStartsOn: 1 });
    const daysRange = dateFns.differenceInDays(endDate, startDate) + 1;
    const daysArr = Array.from({ length: daysRange }, (v, k) => k);

    const dateArray = this.props.currentGoal.days.map(element => element.date);

    const days = daysArr.map(element => {
      let elementIndex = null;
      const currentDay = dateFns.addDays(startDate, element);
      const dayVar = dateFns.format(currentDay, 'DD.MM.YYYY');
      const inGoal = dateArray.includes(dayVar);
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

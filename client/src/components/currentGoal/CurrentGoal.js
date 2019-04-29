import React, { Component } from 'react';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Months from './Months';
import WeekDays from './WeekDays';
import Days from './Days';
import Spinner from '../spinner/Spinner';
import { isEmpty } from '../../utils/is-empty';

const styles = theme => {
  console.log(theme);
  return {
    root: {
      width: '80%',
      margin: 'auto',
      [theme.breakpoints.down('xs')]: {
        width: '100%' // for screens smaller then 600 use 100%
      },
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column'
    },
    title: {
      backgroundColor: theme.palette.background.default,
      paddingTop: '0.5em',
      paddingBottom: '0.5em',
      borderRadius: '0.5em',
      marginLeft: '0.5em',
      marginRight: '0.5em'
    }
  };
};
class CurrentGoal extends Component {
  state = {
    currentMonth: new Date()
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    const { classes, loading, currentGoal } = this.props;
    const progress = <Spinner />;
    const goal = (
      <div className={classes.root}>
        <Typography variant={'h6'} align={'center'} className={classes.title}>
          {currentGoal.title}
        </Typography>
        <Months
          currentMonth={this.state.currentMonth}
          nextMonth={this.nextMonth}
          prevMonth={this.prevMonth}
        />
        <WeekDays currentMonth={this.state.currentMonth} />
        <Days currentMonth={this.state.currentMonth} />
      </div>
    );

    return (
      <React.Fragment>
        {loading ? progress: null}
        {!isEmpty(currentGoal) ? goal : null}
      </React.Fragment>
    );

  }
}

CurrentGoal.propTypes = {
  loading: PropTypes.bool.isRequired,
  currentGoal: PropTypes.object.isRequired,
}

const mapSateToProps = state => ({
  loading: state.loading.loading,
  currentGoal: state.currentGoal.currentGoal
});

export default connect(mapSateToProps)(withRouter(withStyles(styles)(CurrentGoal)));

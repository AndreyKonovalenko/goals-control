import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NodeGroup } from 'react-move';
import { range } from 'd3-array';
import { easeExpOut } from 'd3-ease';
import { withRouter } from 'react-router-dom';
import DragHandle from '@material-ui/icons/DragHandle';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Spinner from '../spinner/Spinner';

//import arrayExtractor from '../../utils/arrayExtractor';

import {
  fetchGoalsList,
  // updateGaolsOrder,
  deleteGoal,
  createOrder
}
from '../../store/actions/dashboardActions';

import { fetchSelectedGoal } from '../../store/actions/currentGoalActions';

const updateOrder = (arr, beg, end) => {
  const copy = arr.slice(0);
  const val = copy[beg];
  copy.splice(beg, 1);
  copy.splice(end, 0, val);
  return copy;
};

const clamp = (n, min, max) => {
  return Math.max(Math.min(n, max), min);
};

const itemHeight = 100;

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center'
  },

  list: {
    width: '80%',
    [theme.breakpoints.down('xs')]: {
      width: '100%' // for screens smaller then 600 use 100%
    },
    backgroundColor: theme.palette.background.paper
  },

  item: {
    position: 'absolute',
    width: '100%',
    height: `${itemHeight}px`,
    overflow: 'visible',
    pointerEvents: 'auto',
    transformOrigin: '50% 50% 0px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
    cursor: 'pointer'
  }
});

class Dashboard extends Component {
  state = {
    // order: [], // calculated value
    // itemsCount: 0, // calculatd value
    topDeltaY: 0, // animation config
    mouseY: 0, // animation config
    isPressed: false, //animatin config
    lastPressed: 0 //anigmatin config
  };

  handleTouchStart = (pos, pressY, { touches: [{ pageY }] }) => {
    this.setState({
      topDeltaY: pageY - pressY,
      mouseY: pressY,
      isPressed: true,
      lastPressed: pos
    });

    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleTouchEnd);
  };

  handleTouchMove = e => {
    e.preventDefault();
    this.handleMouseMove(e.touches[0]);
  };

  handleMouseDown = (pos, pressY, { pageY }) => {
    this.setState({
      topDeltaY: pageY - pressY,
      mouseY: pressY,
      isPressed: true,
      lastPressed: pos
    });

    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  };

  handleMouseMove = ({ pageY }) => {
    const { isPressed, topDeltaY, lastPressed } = this.state;
    const { order, itemsCount } = this.props;

    if (isPressed) {
      const mouseY = pageY - topDeltaY;
      const currentRow = clamp(
        Math.round(mouseY / itemHeight),
        0,
        itemsCount - 1
      );
      let newOrder = order;

      if (currentRow !== order.indexOf(lastPressed)) {
        newOrder = updateOrder(order, order.indexOf(lastPressed), currentRow);
      }

      this.setState({ mouseY, order: newOrder });
    }
  };

  handleMouseUp = () => {
    this.setState({ isPressed: false, topDeltaY: 0 });

    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);
  };

  handleTouchEnd = () => {
    this.setState({ isPressed: false, topDeltaY: 0 });

    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('touchend', this.handleTouchEnd);
  };

  componentDidMount() {
    //const { goals } = this.props.goalsList;
    this.props.fetchGoalsList();
    // if (goals !== undefined) {
    //   this.props.createOrder(goals);
    // }
    console.log('did mount!!');
  }

  // componentDidUpdate(prevProps, prevState) {
  //   // need move order state to redux store!!!
  //   console.log(
  //     'didUpdate works!!!',
  //     this.props.goalsList.goals,
  //     prevProps.goalsList.goals,
  //     this.state.order
  //   );
  //   // test check
  //   // Delete case
  //   if (
  //     this.props.goalsList.goals !== undefined &&
  //     this.props.goalsList.goals.length !== this.state.order.length
  //   ) {
  //     console.log('unequal orders', this.state.order, prevState.order);
  //     const l = this.props.goalsList.goals.length;
  //     console.log(l);
  //     const listOrder = Array.from({ length: l }, (v, k) => k);
  //     this.setState({ itemsCount: l, order: listOrder });
  //     console.log('ordrer', this.state.order);
  //   }

  //   // General case

  //   if (
  //     this.props.goalsList.goals !== prevProps.goalsList.goals &&
  //     this.props.goalsList.goals === undefined
  //   ) {
  //     this.setState({ itemsCount: 0, order: [] });
  //   }
  //   else if (
  //     this.props.goalsList.goals !== prevProps.goalsList.goals &&
  //     this.props.goalsList.goals !== undefined
  //   ) {
  //     const l = this.props.goalsList.goals.length;
  //     console.log(l);
  //     const listOrder = Array.from({ length: l }, (v, k) => k);
  //     this.setState({ itemsCount: l, order: listOrder });

  //     // Editing case
  //     if (this.props.editing === false && prevProps.editing === true) {
  //       const reorderedArray = this.state.order.map(element => {
  //         element = this.props.goalsList.goals[element];
  //         console.log(element);
  //         return element;
  //       });
  //       this.props.updateGaolsOrder(reorderedArray);
  //     }
  //   }
  //   console.log(
  //     'didUpdate2 works!!!',
  //     this.props.goalsList.goals,
  //     prevProps.goalsList.goals
  //   );
  // }

  onClickHandler = (id, event) => {
    event.preventDefault();
    console.log('Clicked!!', id);
    this.props.fetchSelectedGoal(id);
    this.props.history.push('/goal');
  };

  onDeleteHandler = (arr, id, event) => {
    event.preventDefault();
    this.props.deleteGoal(arr, id);
    console.log('delete goal');
  };

  render() {
    const { classes, editing, loading, errors, order, itemsCount } = this.props;
    const { mouseY, isPressed, lastPressed, } = this.state;
    const { goals } = this.props.goalsList;
    console.log(order, goals);
    const message = (
      <Typography align='center' component='h1' variant='h6'>
        you have not set goals yet
      </Typography>
    );

    const progress = <Spinner />;

    const list = (
      <div className={classes.root}>
        <NodeGroup
          data={range(itemsCount)} // this is parameter sets the number of nodes
          keyAccessor={d => `item-key-${d}`}
          start={d => ({
            scale: 1,
            y: order.indexOf(d) * itemHeight
          })}
          update={d => {
            const dragging = lastPressed === d && isPressed;
            return {
              scale: [dragging ? 1.1 : 1],
              shadow: [dragging ? 5 : 1],
              y: [order.indexOf(d) * itemHeight],
              timing: { duration: 350, ease: easeExpOut }
            };
          }}
        >
          {nodes => (
            <List
              className={classes.list}
              disablePadding
              style={{ height: itemHeight * itemsCount }}
            >
              {nodes.map(({ key, data, state }) => {
                const { scale, y } = state;
                const transY = lastPressed === data && isPressed ? mouseY : y;
                return (
                  <ListItem
                    button={editing ? false : true}
                    divider
                    className={classes.item}
                    onClick={
                      editing
                        ? null
                        : event => this.onClickHandler(goals[data].id, event)
                    }
                    key={key}
                    style={{
                      transform: `translate3d(0, ${transY}px, 0) scale(${scale})`,
                      WebkitTransform: `translate3d(0, ${transY}px, 0) scale(${scale})`,
                      zIndex: data === lastPressed ? 99 : data
                    }}
                  >
                    {editing ? (
                      <IconButton
                        aria-label='Delete'
                        onClick={event =>
                          this.onDeleteHandler(goals, goals[data].id, event)
                        }
                        color='secondary'
                      >
                        <DeleteIcon />
                      </IconButton>
                    ) : null}
                    <ListItemText
                      style={{ flexGrow: 1 }}
                      primary={goals[data].title}
                    />
                    {editing ? (
                      <DragHandle
                        className={classes.icon}
                        onMouseDown={e => this.handleMouseDown(data, y, e)}
                        onTouchStart={e => this.handleTouchStart(data, y, e)}
                      />
                    ) : null}
                  </ListItem>
                );
              })}
            </List>
          )}
        </NodeGroup>
      </div>
    );

    return (
      <React.Fragment>
        {loading ? progress : null}
        {goals !== undefined ? list : null}
      </React.Fragment>
    );
  }
}

// {errors.no_goals ? message : null}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  editing: PropTypes.bool.isRequired,
  goalsList: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  // updateGaolsOrder: PropTypes.func.isRequired,
  order: PropTypes.array.isRequired,
  itemsCount: PropTypes.number.isRequired
};

const mapSateToProps = state => ({
  errors: state.errors,
  editing: state.dashboard.editing,
  goalsList: state.dashboard.goalsList,
  loading: state.loading.loading,
  order: state.dashboard.order,
  itemsCount: state.dashboard.itemsCount
});

export default connect(
  mapSateToProps, { fetchGoalsList, fetchSelectedGoal, deleteGoal, createOrder }
)(withRouter(withStyles(styles)(Dashboard)));

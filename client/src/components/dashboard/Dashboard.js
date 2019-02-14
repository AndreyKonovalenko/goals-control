import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NodeGroup } from 'react-move';
import { range } from 'd3-array';
import { easeExpOut } from 'd3-ease';
//import Typography from '@material-ui/core/Typography';
import DragHandle from '@material-ui/icons/DragHandle';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
    paddingTop: 64,
    [theme.breakpoints.down('xs')]: {
      paddingTop: 56, // for screens smaller then 600 use 100%
    },
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center'
  },

  list: {
    width: '80%',
    [theme.breakpoints.down('xs')]: {
      width: '100%', // for screens smaller then 600 use 100%
    },
    height: `${itemHeight * 3}px`,
    backgroundColor: theme.palette.background.paper,
  },

  item: {
    position: 'absolute',
    width: '100%',
    height: `${itemHeight}px`,
    // lineHieght: `${itemHeight-3}`,
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
  },
});

class Dashboard extends Component {
  // this is fake state for fronend testeing
  state = {
    goals: [{
        id: 1,
        title: 'workout 4 time a week'
      },
      {
        id: 2,
        title: 'code everyday'
      },
      {
        id: 3,
        title: 'Fide the right pass'
      }
    ],
    order: [0, 1, 2], // from back-end
    itemsCount: 3, // form back- end
    topDeltaY: 0, // animation config
    mouseY: 0, // animation config
    isPressed: false, //animatin config
    lastPressed: 0, //anigmatin config
  };

  handleTouchStart = (pos, pressY, { touches: [{ pageY }] }) => {
    this.setState({
      topDeltaY: pageY - pressY,
      mouseY: pressY,
      isPressed: true,
      lastPressed: pos
    });

    window.addEventListener("touchmove", this.handleTouchMove);
    window.addEventListener("touchend", this.handleTouchEnd);
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

    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
  };

  handleMouseMove = ({ pageY }) => {
    const { isPressed, topDeltaY, order, lastPressed, itemsCount } = this.state;

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

    window.removeEventListener("mouseup", this.handleMouseUp);
    window.removeEventListener("mousemove", this.handleMouseMove);
  };

  handleTouchEnd = () => {
    this.setState({ isPressed: false, topDeltaY: 0 });

    window.removeEventListener("touchmove", this.handleTouchMove);
    window.removeEventListener("touchend", this.handleTouchEnd);
  };


  render() {
    const { classes, editing } = this.props;
    const { mouseY, isPressed, lastPressed, order, itemsCount } = this.state;

    const list = (
      <div className={classes.root}>
        <NodeGroup
          data={range(itemsCount)} // this is parameter sets the number of nodes
          keyAccessor={d => `item-key-${d}`}
          start={d => ({
            scale:1,
            y: order.indexOf(d)*itemHeight
          })}
          update={d => {
            const dragging = lastPressed === d && isPressed;
            return {
              scale: [dragging ? 1.1 : 1],
              shadow: [dragging ? 5: 1],
              y: [order.indexOf(d) * itemHeight],
              timing: { duration: 350, ease: easeExpOut}
            };
          }}
        >
          {nodes => (
            <List className={classes.list} disablePadding>
              {nodes.map(({key, data, state }) => {
                const {scale, y} = state;
                const transY = lastPressed === data && isPressed ? mouseY : y;
                return (
                  <ListItem
                    divider
                    className={classes.item}
                    key={key}
                    style={
                      {
                        transform: `translate3d(0, ${transY}px, 0) scale(${scale})`,
                        WebkitTransform: `translate3d(0, ${transY}px, 0) scale(${scale})`,
                        zIndex: data === lastPressed ? 99 : data
                      }
                    }
                  >
                    { editing
                      ? (<IconButton aria-label="Delete" color="secondary">
                          <DeleteIcon />
                        </IconButton>)
                      : null
                    }
                    <ListItemText style={{flexGrow: 1}} primary={this.state.goals[order.indexOf(data)].title} />
                    { editing
                      ? (<DragHandle
                        className={classes.icon}
                        onMouseDown={e => this.handleMouseDown(data, y, e)}
                        onTouchStart={e => this.handleTouchStart(data, y, e)}/>)
                      : null
                    }
                  </ListItem>
                );
              })}
            </List>
          )}
        </NodeGroup>
      </div>
    );


    return list;
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  editing: PropTypes.bool.isRequired
};

const mapSateToProps = state => ({
  editing: state.dashboard.editing
})

export default connect(mapSateToProps)(withStyles(styles)(Dashboard));

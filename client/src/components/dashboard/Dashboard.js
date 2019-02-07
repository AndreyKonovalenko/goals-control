import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NodeGroup } from 'react-move';
import { range } from 'd3-array';
import { easeExpOut } from 'd3-ease';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const updateOreder = (arr, beg, end) => {
  const copy = arr.slice(0);
  const val = copy[beg];
  copy.splice(beg, 1);
  copy.splice(end, 0, val);
  return copy;

};

const clamp = (n, min, max) => {
  return Math.max(Math.min(n, max), min);
};

const itemHeight = 75;

const styles = theme => ({
  container: {
    padding: '10%',
    display: 'flex',
    justifyContent: 'center'
  },
  root: {
    maxWidth: 900,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  container2: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    width: 900,
    height: itemHeight * 3 // should add to inline style
  },
  item: {
    position: 'absolute',
    width: '100%',
    height: `${itemHeight-3}`,
    lineHieght: `${itemHeight-3}`,
    overflow: 'visible',
    pointerEvents: 'auto',
    transformOrigin: '50% 50% 0px',
    color: 'red',
    borderRadius: 4,
    boxSizing: 'border-box'
  }
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
    topDeltaY: 0,
    mouseY: 0,
    isPressed: false,
    lastPressed: 0,
    animation: true
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
    this.handleTouchMove(e.touches[0]);
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

  handleTouchMove = ({ pageY }) => {
    const { isPressed, topDeltaY, lastPressed, itemsCount, order } = this.state;

    if (isPressed) {
      const mouseY = pageY - topDeltaY;
      const currentRow = clamp(
        Math.round(mouseY / itemHeight),
        0,
        itemsCount - 1
      );
      let newOrder = order;
      if (currentRow !== order.indexOf(lastPressed)) {
        newOrder = updateOreder(order, order.indexOf(lastPressed), currentRow);
      }
      this.setState({ mouseY, order: newOrder });
    }
  };

  handleMouseUp = () => {
    this.setState({ isPressed: false, topDeltaY: 0 });
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleTouchMove);
  };

  handleTouchEnd = () => {
    this.setState({ isPressed: false, topDeltaY: 0 });
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('touchend', this.handleTouchEnd);
  };

  render() {

    let list;
    const { classes } = this.props;
    const { mouseY, isPressed, lastPressed, order, itemsCount } = this.state;

    const animatedList = (
      <div className={classes.container2}>
        <NodeGroup
          data={range(itemsCount)} // this is parameter sets the number of nodes
          keyAccessor={d => `item-key-${d}`}
          start={d => ({
            scale:1,
            shadow:1,
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
            <div className={classes.list}>
              {nodes.map(({key, data, state }) => {
                console.log(nodes);
                const {shadow, scale, y} = state;
                const transY = lastPressed === data && isPressed ? mouseY : y;
                return (
                  <div
                    className={classes.item}
                    key={key}
                    onMouseDown={e => this.handleMouseDown(data, y, e)}
                    onTouchStart={e => this.handleTouchStart(data, y, e)}
                    style={{
                      boxShadow: `rgba(0, 0, 0, 0.4) 0px ${shadow}px ${2 *
                        shadow}px 0px`,
                      transform: `translate3d(0, ${transY}px, 0) scale(${scale})`,
                      WebkitTransform: `translate3d(0, ${transY}px, 0) scale(${scale})`,
                      zIndex: data === lastPressed ? 99 : data
                    }}
                  >
                    {order.indexOf(data) +1}
                    {this.state.goals[order.indexOf(data)].title}
                  </div>
                );
              })}
            </div>
          )}
        </NodeGroup>
      </div>
    );

    const basicList = (
      <div className={classes.container}>
        <List className={classes.root} disablePadding>
          {this.state.goals.map(element => (
            <ListItem key={element.id} divider>
              <ListItemText primary={element.title} />
            </ListItem>
            ))
          }
        </List>
      </div>
    );

    if (this.state.animation) {
      list = animatedList;
    }
    else {
      list = basicList;
    }
    console.log(animatedList);
    return animatedList;
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);

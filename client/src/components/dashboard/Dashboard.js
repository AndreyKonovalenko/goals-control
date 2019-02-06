import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Motion, spring } from 'react-motion';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const reinsert = (arr, from, to) => {
  const _arr = arr.slice(0);
  const val = _arr[from];
  _arr.splice(from, 1);
  _arr.splice(to, 0, val);
  return _arr;
};

const clamp = (n, min, max) => {
  return Math.max(Math.min(n, max), min);
};

const springConfig = { stiffness: 300, dapming: 50 };

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

  button: {
    margin: theme.spacing.unit
  },
  container2: {
    padding: '10%',
    display: 'flex',
    justifyContent: 'center',
  },
  root2: {
    position: 'absolute',
    maxWidth: 900,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },

  item: {
    position: 'absolute',
    width: '100%',
    height: 90,
    overflow: 'visible',
    pointerEvents: 'auto',
    transformOrigin: '50% 50% 0px',
    borderRadius: 4,
    lineHeight: 96,
    paddingLeft: 32,
    boxSizing: 'border-box'
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
    order: [0, 1, 2],
    itemsCount: 3,
    topDeltaY: 0,
    mouseY: 0,
    isPressed: false,
    originalPosOfLastPressed: 0,
    animation: true
  };

  componentDidMount() {
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  };

  handleTouchStart = (key, pressLocation, e) => {
    this.handleMouseDown(key, pressLocation, e.touches[0]);
  };

  handleTouchMove = (e) => {
    e.preventDefault();
    this.handleMouseMove(e.touches[0]);
  };

  handleMouseDown = (pos, pressY, { pageY }) => {
    this.setState({
      topDeltaY: pageY - pressY,
      mouseY: pressY,
      isPressed: true,
      originalPosOfLastPressed: pos,
    });
  };

  handleMouseMove = ({ pageY }) => {
    const { isPressed, topDeltaY, order, originalPosOfLastPressed, itemsCount } = this.state;

    if (isPressed) {
      const mouseY = pageY - topDeltaY;
      const currentRow = clamp(Math.round(mouseY / 100), 0, itemsCount - 1);
      let newOrder = order;

      if (currentRow !== order.indexOf(originalPosOfLastPressed)) {
        newOrder = reinsert(order, order.indexOf(originalPosOfLastPressed), currentRow);
      }

      this.setState({ mouseY: mouseY, order: newOrder });
    }
  };

  handleMouseUp = () => {
    this.setState({ isPressed: false, topDeltaY: 0 });
  };

  render() {
    const { isPressed, mouseY, order, originalPosOfLastPressed } = this.state;
    const { classes } = this.props;
    let list;

    // Animation List

    const animatedList = order.map(i => {
      const style = originalPosOfLastPressed === i && isPressed ? {
        scale: spring(1.1, springConfig),
        shadow: spring(16, springConfig),
        y: mouseY,
      } : {
        scale: spring(1, springConfig),
        shadow: spring(1, springConfig),
        y: spring(order.indexOf(i) * 100, springConfig),
      };

      return (
        <div className={classes.container2} >
          <List className={classes.root2}>
            <Motion style={style} key={i}>
                {({scale, shadow, y}) =>
                    <ListItem
                      onMouseDown={this.handleMouseDown.bind(null, i, y)}
                      onTouchStart={this.handleTouchStart.bind(null, i, y)}
                      className={classes.item}
                      style={{
                        boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
                        transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                        WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                        zIndex: i === originalPosOfLastPressed ? 99 : i,
                        }}>
                      <ListItemText primary={this.state.goals[i].title}  />
                    </ListItem>
                }
              </Motion>
            </List>
          </div>
      );
    });

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

    return list;
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);

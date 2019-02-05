import React, { Component } from 'react';
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
    marginTop: '5%',
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 360,
    width: '100%'
  },

  button: {
    margin: theme.spacing.unit
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
    order: [0, 1, 2],
    itemsCount: 3,
    topDeltaY: 0,
    mouseY: 0,
    isPressed: false,
    originalPosOfLastPressed: 0,
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

    // Animation List

    const list = order.map(i => {
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
        <Motion style={style} key={i}>
            {({scale, shadow, y}) =>
              <ListItem
                onMouseDown={this.handleMouseDown.bind(null, i, y)}
                onTouchStart={this.handleTouchStart.bind(null, i, y)}
                className={classes.list}
                style={{
                  boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
                  transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                  WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                  zIndex: i === originalPosOfLastPressed ? 99 : i,
                  }}>
                {order.indexOf(i) + 1}
                <ListItemText primary={this.state.goals[i].title}  />
              </ListItem>
            }
          </Motion>
      );

    });

    return (
      <div className={classes.container}>
        <List component='ul' className={classes.root}>
          {list}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);

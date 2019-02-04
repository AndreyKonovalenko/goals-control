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


class Main extends Component {
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
    ]
  };


  render() {
    const itemsCount = this.state.goals.length;
    console.log(itemsCount);

    const { classes } = this.props;
    const list = this.state.goals.map(element => (
      <ListItem key={element.id} className={classes.list} divider={true} >
        <ListItemText primary={element.title}  />
      </ListItem>
    ));
    return (
      <div className={classes.container}>
        <List componetn='ul' className={classes.root}>
          {list}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(Main);

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
    goals: [
      {
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
    const { classes } = this.props;
    const list = this.state.goals.map(element => (
      <ListItem key={element.id} className={classes.list}>
        <ListItemText primary={element.title} />
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

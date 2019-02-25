import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    width: '80%',
    margin: 'auto',
    [theme.breakpoints.down('xs')]: {
      width: '100%' // for screens smaller then 600 use 100%
    },
    paddingTop: '0.5em',
    paddingBottom: '0.5em',
    backgroundColor: theme.palette.background.paper
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 320
  }
});

class GoalBuilder extends Component {
  state = {
    title: '',
    limitation: '',
    from: ''
  };

  onChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // Add save and cancle buttons!!!
  render() {
    const { classes } = this.props;
    console.log(this.state);
    return (
      <Paper className={classes.root}>
        <Typography align='center' variant='h6'>
          NEW GOAL
        </Typography>
        <form className={classes.container} noValidate>
          <TextField
            label="Enter Goal Name"
            name="title"
            className={classes.textField}
            value={this.state.title}
            onChange={this.onChangeHandler}
            margin="normal"
          />
          <TextField
            label="How many days to reach the goal?"
            name="limitation"
            className={classes.textField}
            value={this.state.limitation}
            onChange={this.onChangeHandler}
            margin="normal"
          />
          <TextField
            id='date'
            label='Start Date'
            type='date'
            name='from'
            value={this.state.from}
            onChange={this.onChangeHandler}
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles)(GoalBuilder);

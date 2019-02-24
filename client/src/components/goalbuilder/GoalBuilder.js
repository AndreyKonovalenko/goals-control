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
    backgroundColor: theme.palette.background.paper
  },

  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

class GoalBuilder extends Component {
  state = {
    title: '',
    limitation: '',
    from: ''
  };

  onChangeHandler = event => {
    console.log(event.target, event.target.defaultValue);
    this.setState({ [event.target.name]: event.target.defaultValue });
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Typography align='center' variant='h6'>
          Set up your new gaol
        </Typography>
        <form className={classes.container} noValidate>
          <TextField
            id='date'
            label='Start Date'
            type='date'
            name='form'
            defaultValue={this.state.from}
            onChange={this.onChangeHandler}
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
          />
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles)(GoalBuilder);

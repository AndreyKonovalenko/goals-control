import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { createGoal } from '../../store/actions/goalActions';
//import { isEmpty } from '../../utils/is-empty';

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
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 3
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

  onSaveHandler = () => {;
    const newGoal = {
      title: this.state.title,
      limitation: this.state.limitation,
      from: this.state.from,
    }
    console.log('this is new', newGoal);
    this.props.createGoal(newGoal, this.props.history);
  }
  // Add save and cancle buttons!!!
  render() {
    const { classes, } = this.props;
    console.log(this.state);
    return (
      <Paper className={classes.root}>
        <form className={classes.container} noValidate>
          <Typography align='center' variant='h6' className={classes.margin} color='secondary'>
          NEW GOAL
          </Typography>
          <TextField
            fullWidth
            label="Enter Goal Name"
            name="title"
            value={this.state.title}
            onChange={this.onChangeHandler}
            margin="normal"
          />
          <TextField
            label="How many days to reach the goal?"
            name="limitation"
            fullWidth
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
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
          <div>
            <Button size="small" className={classes.button}>
              Cancle
            </Button>
            <Button size = "small"
              onClick={this.onSaveHandler}
              className = { classes.button }
            >
              Save
            </Button>
          </div>
        </form>
      </Paper>
    );
  }
}
GoalBuilder.propTyeps = {
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  erros: state.errors,
})

export default connect(mapStateToProps, { createGoal })(withStyles(styles)(GoalBuilder));

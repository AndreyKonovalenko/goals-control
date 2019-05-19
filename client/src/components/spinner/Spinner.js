import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    position: 'absolute',
    marginLeft: -20,
    left: '50%',
    top: '30%',
    zIndex: 10000
  }
});

const Spinner = props => (
  <CircularProgress className={props.classes.progress} />
);

export default withStyles(styles)(Spinner);

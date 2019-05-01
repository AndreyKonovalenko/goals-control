import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import NavBar from './NavBar';
import { withRouter } from 'react-router-dom';
import lightBlue from '@material-ui/core/colors/lightBlue';
import pink from '@material-ui/core/colors/pink';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    paddingTop: 64,
    [theme.breakpoints.down('xs')]: {
      paddingTop: 56 // for screens smaller then 600 use 100%
    }
  }
});

class Layout extends Component {
  render() {
    const { classes } = this.props;
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: lightBlue[600]
        },
        secondary: {
          main: pink[600]
        }
      },
      typography: {
        useNextVariants: true
      }
    });
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar mainLocation={this.props.location.pathname} />
        <div className={classes.root}>{this.props.children}</div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(withStyles(styles)(Layout));

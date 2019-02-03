import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import NavBar from './NavBar';
import lightBlue from '@material-ui/core/colors/lightBlue';
import green from '@material-ui/core/colors/green';
import CssBaseline from '@material-ui/core/CssBaseline';

class Layout extends Component {
  render() {
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: lightBlue[600]
        },
        secondary: {
          main: green[600]
        }
      },
      typography: {
        useNextVariants: true
      }
    });

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}

export default Layout;

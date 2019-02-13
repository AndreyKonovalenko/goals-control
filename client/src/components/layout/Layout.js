import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import NavBar from './NavBar';
import lightBlue from '@material-ui/core/colors/lightBlue';
import pink from '@material-ui/core/colors/pink';
import CssBaseline from '@material-ui/core/CssBaseline';

class Layout extends Component {
  render() {

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
        <NavBar />
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}

export default Layout;

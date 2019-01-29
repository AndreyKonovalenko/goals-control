import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import NavBar from '../../components/Navigation/NavBar';
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
          main: pink[400]
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
        <h1>m</h1>
      </MuiThemeProvider>
    );
  }
}

export default Layout;

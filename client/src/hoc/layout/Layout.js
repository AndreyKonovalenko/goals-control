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
          light: lightBlue[200],
          main: lightBlue[400],
          dark: lightBlue[600],
        },
        secondary: {
          light: pink[200],
          main: pink[400],
          dark: pink[600],
        }
      },
      typography: {
        useNextVariants: true,
      },
    });

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar / >
        <h1>m</h1>
      </MuiThemeProvider>
    );
  }

}

export default Layout;

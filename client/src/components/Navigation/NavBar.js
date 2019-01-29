import React from 'react';
import AppBar from '@material-ui/core/AppBar';
//import { withStyle } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const NavBar = () => {
  // const styles = {

  // }
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='title' color='inherit'>
          Goals - Control App
        </Typography>
        <Button color='inherit'>Login</Button>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;

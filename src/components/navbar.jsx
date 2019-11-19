import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const StyledNavbar = styled.div`
  margin: auto;
`;

const Navbar = () => {
  return (
    <AppBar>
      <StyledNavbar>
        <Toolbar>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Signup
          </Button>
        </Toolbar>
      </StyledNavbar>
    </AppBar>
  );
};

export default Navbar;

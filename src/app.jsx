import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { connect } from 'react-redux';
import themeFile from './util/theme';
// Pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
// Components
import Navbar from './components/navbar';
import AuthRoute from './util/auth-route';
import { logoutUser, getUserData, setAuthenticated } from './store/actions/user-actions';

const theme = createMuiTheme(themeFile);
const StyledContainer = styled.div`
  margin: 80px auto 0 auto;
  max-width: 1200px;
`;

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    logoutUser();
    window.location.href = '/login';
  } else {
    setAuthenticated();
    console.log('work');
    axios.defaults.headers.common.Authorization = token;
    getUserData();
  }
}

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <StyledContainer>
          <Switch>
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/signup" component={Signup} />
          </Switch>
        </StyledContainer>
      </Router>
    </MuiThemeProvider>
  );
};

export default connect(null, { logoutUser, getUserData, setAuthenticated })(App);

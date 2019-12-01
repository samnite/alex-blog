import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import themeFile from './util/theme';
// Pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
// Components
import Navbar from './components/layout/navbar';
import AuthRoute from './util/auth-route';
import { logoutUser, getUserData } from './store/actions/user-actions';
import store from './store/store';
import { SET_AUTHENTICATED } from './store/types';
import User from './pages/user';

const history = createBrowserHistory();

const theme = createMuiTheme(themeFile);
const StyledContainer = styled.div`
  margin: 80px auto 0 auto;
  max-width: 1200px;
`;

axios.defaults.baseURL = 'https://europe-west1-alex-blog-4c277.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common.Authorization = token;
    store.dispatch(getUserData());
  }
}

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Router>
            <Navbar />
            <StyledContainer>
              <Switch>
                <Route exact path="/" component={Home} />
                <AuthRoute exact path="/login" component={Login} />
                <AuthRoute exact path="/signup" component={Signup} />
                <Route exact path="/users/:handle" component={User} />
                <Route exact path="/users/:handle/scream/:screamId" component={User} />
              </Switch>
            </StyledContainer>
          </Router>
        </ConnectedRouter>
      </Provider>
    </MuiThemeProvider>
  );
};

export default App;

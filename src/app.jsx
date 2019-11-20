import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
// Pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
// Components
import Navbar from './components/navbar';

const theme = createMuiTheme(themeFile);
const StyledContainer = styled.div`
  margin: 80px auto 0 auto;
  max-width: 1200px;
`;

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <StyledContainer>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </StyledContainer>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;

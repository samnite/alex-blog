import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Link } from 'react-router-dom';
import { loginUser } from '../store/actions/user-actions';
import AppIcon from '../images/icon.png';

const styles = theme => ({
  ...theme.spreadThis,
});

const Login = ({ classes, history, loginUser, UI: { loading, errors } }) => {
  const [stateErrors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (errors) {
      setErrors(errors);
    }
  }, [errors]);

  const handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email,
      password,
    };
    loginUser(userData, history);
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="monkey" className={classes.image} />
        <Typography variant="h3" className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            helperText={stateErrors.email}
            error={!!stateErrors.email}
            className={classes.textField}
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            helperText={stateErrors.password}
            error={!!stateErrors.password}
            className={classes.textField}
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
          />
          {stateErrors.general && (
            <Typography variant="body2" className={classes.customError}>
              {stateErrors.general}
            </Typography>
          )}
          <Button
            type="submit"
            disabled={loading}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Login
            {loading && <CircularProgress size={30} className={classes.progress} />}
          </Button>
          <br />
          <small>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Don't have an account? sign up <Link to="/signup">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { loginUser })(withStyles(styles)(Login));

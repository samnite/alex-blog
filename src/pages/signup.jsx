import React, { useEffect, useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signupUser } from '../store/actions/user-actions';
import AppIcon from '../images/icon.png';

const styles = theme => ({
  ...theme.spreadThis,
});

const Signup = ({ classes, history, signupUser, UI: { loading, errors } }) => {
  const [stateErrors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [handle, setHandle] = useState('');

  useEffect(() => {
    if (errors) {
      setErrors(errors);
    }
  }, [errors]);

  const handleSubmit = event => {
    event.preventDefault();
    const newUserData = {
      email,
      password,
      confirmPassword,
      handle,
    };
    signupUser(newUserData, history);
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="monkey" className={classes.image} />
        <Typography variant="h3" className={classes.pageTitle}>
          Sign Up
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
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            helperText={stateErrors.confirmPassword}
            error={!!stateErrors.confirmPassword}
            className={classes.textField}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            fullWidth
          />
          <TextField
            id="handle"
            name="handle"
            type="text"
            label="Handle"
            helperText={stateErrors.handle}
            error={!!stateErrors.handle}
            className={classes.textField}
            value={handle}
            onChange={e => setHandle(e.target.value)}
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
            Signup
            {loading && <CircularProgress size={30} className={classes.progress} />}
          </Button>
          <br />
          <small>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Already have an account? Login <Link to="/login">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(Signup));

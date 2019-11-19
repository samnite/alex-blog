import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
// MUI Stuff
import Grid from '@material-ui/core/Grid';

const styles = {
  form: {
    textAlign: 'center',
  },
};

const Login = ({ classes }) => {
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <p>Yooooo</p>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);

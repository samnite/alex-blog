import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { submitComment } from '../../store/actions/data-actions';

const styles = theme => ({
  ...theme.spreadThis,
});

const CommentForm = ({
  classes,
  authenticated,
  submitComment,
  screamId,
  UI: { errors, loading },
}) => {
  const [body, setBody] = useState('');
  const [stateErrors, setErrors] = useState({});
  useEffect(() => {
    if (errors) {
      setErrors(errors);
    }
    if (!errors && !loading) {
      setBody('');
    }
  }, [errors, loading]);
  const handleSubmit = e => {
    e.preventDefault();
    submitComment(screamId, { body });
    setBody('');
  };
  return authenticated ? (
    <Grid item sm={12} style={{ textAlign: 'center' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on scream"
          error={!!stateErrors.comment}
          helperText={stateErrors.comment}
          value={body}
          onChange={e => setBody(e.target.value)}
          fullWidth
          className={classes.textField}
        />
        <Button type="submit" variant="contained" color="primary" className={classes.button}>
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : null;
};

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { submitComment })(withStyles(styles)(CommentForm));

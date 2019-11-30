import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import MyButton from '../../util/my-button';
import { clearErrors, postScream } from '../../store/actions/data-actions';

const styles = theme => ({
  ...theme.spreadThis,
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10,
    marginBottom: 10,
  },
  progressSpinner: {
    position: 'absolute',
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '5%',
  },
});

const PostScream = ({ postScream, clearErrors, classes, UI: { loading, errors } }) => {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');
  const [stateErrors, setErrors] = useState({});

  useEffect(() => {
    if (errors) {
      setErrors(errors);
    }
    if (!errors && !loading) {
      setBody('');
      handleClose();
    }
  }, [errors, loading]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    clearErrors();
    setOpen(false);
    setErrors({});
  };

  const handleSubmit = e => {
    e.preventDefault();
    postScream({ body });
  };

  return (
    <>
      <MyButton onClick={handleOpen} tip="Post a scream!">
        <AddIcon />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton tip="Close" onClick={handleClose} tipClassName={classes.closeButton}>
          <CloseIcon />
        </MyButton>
        <DialogTitle>Post a new Scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="Scream!"
              multiline
              rows="3"
              placeholder="Scream at your fellow friends"
              error={!!stateErrors.body}
              helperText={stateErrors.body}
              className={classes.textField}
              onChange={e => setBody(e.target.value)}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loading}
            >
              Submit
              {loading && <CircularProgress size={30} className={classes.progressSpinner} />}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postScream, clearErrors })(
  withStyles(styles)(PostScream),
);

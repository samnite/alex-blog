import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { deleteScream } from '../store/actions/data-actions';
import MyButton from '../util/my-button';

const styles = {
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10%',
  },
};

const DeleteScream = ({ deleteScream, classes, screamId }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onDeleteScream = () => {
    deleteScream(screamId);
    setOpen(false);
  };

  return (
    <>
      <MyButton tip="Delete Scream" onClick={handleOpen} btnClassName={classes.deleteButton}>
        <DeleteOutline color="secondary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want delete this scream?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onDeleteScream} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DeleteScream.propTypes = {
  deleteScream: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
};

export default connect(null, { deleteScream })(withStyles(styles)(DeleteScream));

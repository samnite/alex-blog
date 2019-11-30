import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import { editUserDetails } from '../../store/actions/user-actions';
import MyButton from '../../util/my-button';

const styles = theme => ({
  ...theme.spreadThis,
  button: {
    float: 'right',
  },
});

const EditDetails = ({ editUserDetails, credentials, classes }) => {
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setUserDetailsToState(credentials);
  }, [credentials]);

  const handleOpen = () => {
    setOpen(true);
    setUserDetailsToState(credentials);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    const userDetails = {
      bio,
      website,
      location,
    };
    editUserDetails(userDetails);
    handleClose();
  };
  const setUserDetailsToState = credentials => {
    setBio(credentials.bio ? credentials.bio : '');
    setWebsite(credentials.website ? credentials.website : '');
    setLocation(credentials.location ? credentials.location : '');
  };

  return (
    <>
      <MyButton tip="Edit Details" onClick={handleOpen} btnClassName={classes.button}>
        <EditIcon color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={bio}
              onChange={e => setBio(e.target.value)}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your personal/professional website"
              className={classes.textField}
              value={website}
              onChange={e => setWebsite(e.target.value)}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              value={location}
              onChange={e => setLocation(e.target.value)}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));

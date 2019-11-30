import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import { connect } from 'react-redux';
import ChatIcon from '@material-ui/icons/Chat';
import CardContent from '@material-ui/core/CardContent';
import MyButton from '../../util/my-button';
import { getScream } from '../../store/actions/data-actions';
import LikeButton from './like-button';

const styles = theme => ({
  ...theme.spreadThis,
  invisibleSeparator: {
    border: 'none',
    margin: 4,
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  dialogContent: {
    padding: 40,
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
  },
  expandButton: {
    position: 'absolute',
    left: '90%',
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
});

const ScreamDialog = ({
  classes,
  getScream,
  screamIdProp,
  scream: { screamId, body, createdAt, likeCount, commentCount, userImage, userHandle },
  UI: { loading },
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    getScream(screamIdProp);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={2}>
      {/* Maybe not 16 but 3 ^ */}
      <Grid item sm={5}>
        <img src={userImage} alt="Profile" className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography component={Link} color="primary" variant="h5" to={`/user/${userHandle}`}>
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount} likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
      </Grid>
    </Grid>
  );

  return (
    <>
      <MyButton onClick={handleOpen} tip="Expand Scream" tipClassName={classes.expandButton}>
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton tip="Close" onClick={handleClose} tipClassName={classes.closeButton}>
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>{dialogMarkup}</DialogContent>
      </Dialog>
    </>
  );
};

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  screamIdProp: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  scream: state.data.scream,
  UI: state.UI,
});

export default connect(mapStateToProps, { getScream })(withStyles(styles)(ScreamDialog));
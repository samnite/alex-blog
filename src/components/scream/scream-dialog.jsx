import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import { connect } from 'react-redux';
import ChatIcon from '@material-ui/icons/Chat';
import MyButton from '../../util/my-button';
import { getScream, clearErrors } from '../../store/actions/data-actions';
import LikeButton from './like-button';
import Comments from './comments';
import CommentForm from './comment-form';

const styles = theme => ({
  ...theme.spreadThis,
});

const ScreamDialog = ({
  classes,
  getScream,
  clearErrors,
  screamIdProp,
  userHandleProp,
  openDialog,
  scream: { screamId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments },
  UI: { loading },
}) => {
  const [open, setOpen] = useState(false);
  const [oldPathState, setOldPath] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [newPathState, setNewPath] = useState('');

  useEffect(() => {
    if (openDialog) {
      handleOpen();
    }
    // eslint-disable-next-line
  }, []);

  const handleOpen = () => {
    let oldPath = window.location.pathname;
    const newPath = `/users/${userHandleProp}/scream/${screamIdProp}`;
    if (oldPath === newPath) {
      oldPath = `/users/${userHandleProp}`;
    }
    window.history.pushState(null, null, newPath);
    setOpen(true);
    setOldPath(oldPath);
    setNewPath(newPath);
    getScream(screamIdProp);
  };
  const handleClose = () => {
    window.history.pushState(null, null, oldPathState);
    setOpen(false);
    clearErrors();
  };

  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={2}>
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
      <hr className={classes.visibleSeparator} />
      <CommentForm screamId={screamId} />
      <Comments comments={comments} />
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
  clearErrors: PropTypes.func.isRequired,
  screamIdProp: PropTypes.string.isRequired,
  userHandleProp: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  scream: state.data.scream,
  UI: state.UI,
});

export default connect(mapStateToProps, { getScream, clearErrors })(
  withStyles(styles)(ScreamDialog),
);

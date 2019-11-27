import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { likeScream, unLikeScream } from '../store/actions/data-actions';
import MyButton from '../util/my-button';
import DeleteScream from './delete-Scream';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
};

const Scream = ({
  classes,
  scream: { userImage, body, createdAt, userHandle, screamId, likeCount, commentCount },
  likeScream,
  unLikeScream,
  user: {
    likes,
    authenticated,
    credentials: { handle },
  },
}) => {
  const likedScream = () => {
    return !!(likes && likes.find(like => like.screamId === screamId));
  };

  const onLikeScream = () => {
    likeScream(screamId);
  };
  const onUnLikeScream = () => {
    unLikeScream(screamId);
  };

  dayjs.extend(relativeTime);

  const likeButton = !authenticated ? (
    <MyButton tip="Like">
      <Link to="/login">
        <FavoriteBorder color="primary" />
      </Link>
    </MyButton>
  ) : likedScream() ? (
    <MyButton tip="Undo Like" onClick={onUnLikeScream}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={onLikeScream}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );

  const deleteButton =
    authenticated && userHandle === handle ? <DeleteScream screamId={screamId} /> : null;

  return (
    <Card className={classes.card}>
      <CardMedia image={userImage} title="Profile Image" className={classes.image} />
      <CardContent className={classes.content}>
        <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        {likeButton}
        <span>{likeCount} Likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} Comments</span>
      </CardContent>
    </Card>
  );
};

Scream.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unLikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, { likeScream, unLikeScream })(withStyles(styles)(Scream));

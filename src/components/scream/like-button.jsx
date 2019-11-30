import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { connect } from 'react-redux';
import MyButton from '../../util/my-button';
import { likeScream, unLikeScream } from '../../store/actions/data-actions';

const LikeButton = ({ likeScream, unLikeScream, screamId, user: { authenticated, likes } }) => {
  const likedScream = () => {
    return !!(likes && likes.find(like => like.screamId === screamId));
  };

  const onLikeScream = () => {
    likeScream(screamId);
  };
  const onUnLikeScream = () => {
    unLikeScream(screamId);
  };

  // eslint-disable-next-line no-nested-ternary
  return !authenticated ? (
    <Link to="/login">
      <MyButton tip="Like">
        <FavoriteBorder color="primary" />
      </MyButton>
    </Link>
  ) : likedScream() ? (
    <MyButton tip="Undo Like" onClick={onUnLikeScream}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={onLikeScream}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

LikeButton.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unLikeScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, { likeScream, unLikeScream })(LikeButton);

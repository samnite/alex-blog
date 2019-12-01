import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const styles = theme => ({
  ...theme.spreadThis,
  commentImage: {
    maxWidth: '100%',
    height: 100,
    objectFit: 'cover',
    borderRadius: '50%',
  },
  commentData: {
    marginLeft: 20,
  },
});

const Comments = ({ comments, classes }) => {
  return (
    <Grid container>
      {comments &&
        comments.map((comment, index) => {
          const { body, createdAt, userImage, userHandle } = comment;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img src={userImage} alt="comment" className={classes.commentImage} />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/user/${userHandle}`}
                        color="primary"
                      >
                        {userHandle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                      </Typography>
                      <hr className={classes.invisibleSeparator} />
                      <Typography variant="body1">{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== comment.length - 1 && <hr className={classes.visibleSeparator} />}
            </Fragment>
          );
        })}
    </Grid>
  );
};

// 10:14

Comments.propTypes = {
  // eslint-disable-next-line react/require-default-props
  comments: PropTypes.array,
};

export default withStyles(styles)(Comments);

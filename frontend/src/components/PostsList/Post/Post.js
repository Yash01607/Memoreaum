import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';

import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { deletePost, likePost } from '../../../actions/PostActions';

import userDetails from '../../Auth/userDetails';

import moment from 'moment';

import useStyles from './PostStyles';

const Post = ({ post, setcurrentId }) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  const user = userDetails;

  const deletePostHandler = () => {
    dispatch(deletePost(post._id));
  };

  const likePostHandler = () => {
    dispatch(likePost(post._id));
  };

  // console.log(post.creator, user?.result?.googleId);

  const Likes = () => {
    if (post.likes.length > 0) {
      // console.log(post?.likes);
      // console.log(user);
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        src={' '}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>

      {(user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator) && (
        <div className={classes.overlay2}>
          <Button
            style={{ color: 'white' }}
            size="small"
            onClick={() => {
              setcurrentId(post._id);
            }}
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
      )}

      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          disabled={!user?.result}
          size="small"
          color="primary"
          onClick={likePostHandler}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button size="small" color="primary" onClick={deletePostHandler}>
            <DeleteIcon fontSize="small"></DeleteIcon>
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;

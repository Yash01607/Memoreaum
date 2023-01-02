import React from 'react';
import { useDispatch } from 'react-redux';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { deletePost, likePost } from '../../../actions/PostActions';

import moment from 'moment';

import useStyles from './PostStyles';

const Post = ({ post, setcurrentId }) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  const deletePostHandler = () => {
    dispatch(deletePost(post._id));
  };

  const likePostHandler = () => {
    console.log('in like post handler');
    dispatch(likePost(post._id));
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
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
        <Button size="small" color="primary" onClick={likePostHandler}>
          <ThumbUpAltIcon fontSize="small"></ThumbUpAltIcon>
          Like
          {post.likeCount}
        </Button>
        <Button size="small" color="primary" onClick={deletePostHandler}>
          <DeleteIcon fontSize="small"></DeleteIcon>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;

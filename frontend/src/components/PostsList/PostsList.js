import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

import Post from './Post/Post';

import useStyles from './PostsListStyles';

const PostsList = ({ setcurrentId }) => {
  const classes = useStyles();

  const postList = useSelector((state) => state.postList);

  const { loading, error, success, posts } = postList;

  // console.log(postList);

  return loading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid item key={post._id} xs={12} sm={6}>
          <Post setcurrentId={setcurrentId} post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PostsList;

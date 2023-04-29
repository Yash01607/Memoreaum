import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Container, Grow, Grid } from '@material-ui/core';

import useStyles from './HoseStyles';

import PostsList from '../PostsList/PostsList';
import Form from '../Form/Form';

import { getPosts } from '../../actions/PostActions';

const Home = () => {
  const [currentId, setcurrentId] = useState(null);

  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);

  return (
    <Grow in>
      <Container>
        <Grid
          container
          className={classes.mainContainer}
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <PostsList setcurrentId={setcurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setcurrentId={setcurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;

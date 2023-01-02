import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AppBar, Container, Grow, Typography, Grid } from '@material-ui/core';

import Posts from './components/PostsList/PostsList';
import Form from './components/Form/Form';

import { getPosts } from './actions/PostActions';

import Memoreaum from './Images/Memoreaum.png';

import useStyles from './styles';

const App = () => {
  const [currentId, setcurrentId] = useState(null);

  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memoreaum
        </Typography>
        <img className={classes.image} src={Memoreaum} alt="icon" height="60" />
      </AppBar>
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
              <Posts setcurrentId={setcurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setcurrentId={setcurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Container } from '@material-ui/core';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/posts/:postId" element={<PostDetails />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;

import express, { Router } from 'express';
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from '../controllers/PostController.js';

const postRouter = express.Router();

postRouter.get('/', getPosts);
postRouter.post('/', createPost);
postRouter.patch('/:id', updatePost);
postRouter.delete('/:id', deletePost);
postRouter.patch('/:id/likepost', likePost);

export default postRouter;

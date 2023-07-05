import express, { Router } from 'express';
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  commentPost,
} from '../controllers/PostController.js';
import { isAuth } from '../middleware/authMiddleware.js';

const postRouter = express.Router();

postRouter.get('/', getPosts);
postRouter.get('/:id', getPost);
postRouter.post('/', isAuth, createPost);
postRouter.patch('/:id', isAuth, updatePost);
postRouter.delete('/:id', isAuth, deletePost);
postRouter.patch('/:id/likepost', isAuth, likePost);
postRouter.post('/:id/commentPost', isAuth, commentPost);

export default postRouter;

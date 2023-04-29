import express, { Router } from 'express';
import {
  signinController,
  signupController,
} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/signin', signinController);
userRouter.post('/signup', signupController);

export default userRouter;

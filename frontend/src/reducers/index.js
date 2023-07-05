import { combineReducers } from 'redux';

import {
  postListReducer,
  createPostReducer,
  updatePostReducer,
  deletePostReducer,
  likePostReducer,
  postReducer,
  // commentPostReducer,
} from './postReducer';

import { googleAuthSuccessBackendSaveReducer } from './authReducer';

export default combineReducers({
  postList: postListReducer,
  createPOst: createPostReducer,
  updatePost: updatePostReducer,
  deletePost: deletePostReducer,
  likePost: likePostReducer,
  googleAuthSuccessBackendSave: googleAuthSuccessBackendSaveReducer,
  post: postReducer,
  // commentPost: commentPostReducer,
});

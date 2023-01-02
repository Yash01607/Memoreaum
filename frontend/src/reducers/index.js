import { combineReducers } from 'redux';

import {
  postListReducer,
  createPostReducer,
  updatePostReducer,
  deletePostReducer,
  likePostReducer,
} from './postReducer';

export default combineReducers({
  postList: postListReducer,
  createPOst: createPostReducer,
  updatePost: updatePostReducer,
  deletePost: deletePostReducer,
  likePost: likePostReducer,
});

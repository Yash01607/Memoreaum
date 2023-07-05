import {
  COMMENT_POST_ERROR,
  COMMENT_POST_REQUEST,
  COMMENT_POST_SUCCESS,
  CREATE_POST_ERROR,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  DELETE_POST_ERROR,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  GET_ALL_POSTS_ERROR,
  GET_ALL_POSTS_REQUESTS,
  GET_ALL_POSTS_SUCCESS,
  GET_POST_ERROR,
  GET_POST_REQUESTS,
  GET_POST_SUCCESS,
  LIKE_POST_ERROR,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  UPDATE_POST_ERROR,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
} from '../constants/PostConstants';

const postListReducer = (state = { loading: false, posts: [] }, action) => {
  switch (action.type) {
    case GET_ALL_POSTS_REQUESTS:
      return { loading: true };
    case GET_ALL_POSTS_SUCCESS:
      return { loading: false, success: true, posts: action.payload };
    case GET_ALL_POSTS_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const postReducer = (state = { loading: false, post: {} }, action) => {
  switch (action.type) {
    case GET_POST_REQUESTS:
      return { loading: true };
    case GET_POST_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case GET_POST_ERROR:
      return { loading: false, error: action.payload };
    case COMMENT_POST_REQUEST:
      return { loading: true };
    case COMMENT_POST_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case COMMENT_POST_ERROR:
      return { loading: true, error: action.payload };
    default:
      return state;
  }
};
const createPostReducer = (state = { loading: false, post: {} }, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return { loading: true };
    case CREATE_POST_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case CREATE_POST_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const updatePostReducer = (state = { loading: false, post: {} }, action) => {
  switch (action.type) {
    case UPDATE_POST_REQUEST:
      return { loading: true };
    case UPDATE_POST_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case UPDATE_POST_ERROR:
      return { loading: true, error: action.payload };
    default:
      return state;
  }
};

const deletePostReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case DELETE_POST_REQUEST:
      return { loading: true };
    case DELETE_POST_SUCCESS:
      return { loading: false, success: true };
    case DELETE_POST_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const likePostReducer = (state = { loading: false, post: {} }, action) => {
  switch (action.type) {
    case LIKE_POST_REQUEST:
      return { loading: true };
    case LIKE_POST_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case LIKE_POST_ERROR:
      return { loading: true, error: action.payload };
    default:
      return state;
  }
};

// const commentPostReducer = (state = { loading: false, post: {} }, action) => {
//   switch (action.type) {
//   }
// };

export {
  postListReducer,
  createPostReducer,
  updatePostReducer,
  deletePostReducer,
  likePostReducer,
  postReducer,
  // commentPostReducer,
};

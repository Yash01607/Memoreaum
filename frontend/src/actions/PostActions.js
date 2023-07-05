import * as api from '../api/index';
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

export const getPosts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_POSTS_REQUESTS });

    const { data } = await api.fetchPostList();

    dispatch({ type: GET_ALL_POSTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_POSTS_ERROR, payload: error.message });
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_POST_REQUESTS });

    const { data } = await api.fetchPost(id);

    dispatch({ type: GET_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_POST_ERROR, payload: error.message });
  }
};

export const createPost = (postData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_POST_REQUEST });

    const { data } = await api.createPost(postData);

    dispatch({ type: CREATE_POST_SUCCESS, payload: data });

    navigate(`/posts/${data._id}`);
  } catch (error) {
    dispatch({ type: CREATE_POST_ERROR, payload: error.message });
  }
};

export const updatepost = (id, updatedPost, navigate) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_POST_REQUEST });
    const { data } = await api.updatepost(id, updatedPost);

    dispatch({ type: UPDATE_POST_SUCCESS, payload: data });

    navigate(`/posts/${data._id}`);
  } catch (error) {
    dispatch({ type: UPDATE_POST_ERROR, payload: error.message });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_POST_REQUEST });
    const { data } = await api.deletePost(id);

    dispatch({ type: DELETE_POST_SUCCESS, payload: data });

    dispatch(getPosts());
  } catch (error) {
    dispatch({ type: DELETE_POST_ERROR, payload: error.message });
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: LIKE_POST_REQUEST });
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE_POST_SUCCESS, payload: data });
    dispatch(getPosts());
  } catch (error) {
    dispatch({ type: LIKE_POST_ERROR, payload: error.message });
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    dispatch({ type: COMMENT_POST_REQUEST });
    const { data } = await api.commentPost(value, id);
    dispatch({ type: COMMENT_POST_SUCCESS, payload: data });

    getPost(id);
  } catch (error) {
    dispatch({ type: COMMENT_POST_ERROR, payload: error.message });
  }
};

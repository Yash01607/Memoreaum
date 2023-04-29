import * as api from '../api/index';
import {
  CREATE_POST_ERROR,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  DELETE_POST_ERROR,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  GET_ALL_POSTS_ERROR,
  GET_ALL_POSTS_REQUESTS,
  GET_ALL_POSTS_SUCCESS,
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

    const { data } = await api.fetchPost();

    dispatch({ type: GET_ALL_POSTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_POSTS_ERROR, payload: error.message });
  }
};

export const createPost = (postData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_POST_REQUEST });

    const { data } = await api.createPost(postData);

    dispatch({ type: CREATE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_POST_ERROR, payload: error.message });
  }
};

export const updatepost = (id, updatedPost) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_POST_REQUEST });
    const { data } = await api.updatepost(id, updatedPost);

    dispatch({ type: UPDATE_POST_SUCCESS, payload: data });
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

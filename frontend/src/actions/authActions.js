import * as api from '../api/index';

import {
  GOOGLE_AUTH_CLIENT_SUCCESS_SERVER_FAILURE,
  GOOGLE_AUTH_CLIENT_SUCCESS_SERVER_SUCCESS,
  JWT_AUTH_FAILURE,
  JWT_AUTH_REQUEST,
  JWT_AUTH_SUCCESS,
  LOGOUT,
} from '../constants/AuthCOnstants';

export const googleLogin = (result, token) => async (dispatch) => {
  try {
    dispatch({
      type: GOOGLE_AUTH_CLIENT_SUCCESS_SERVER_SUCCESS,
      payload: { result, token },
    });
  } catch (error) {
    dispatch({
      type: GOOGLE_AUTH_CLIENT_SUCCESS_SERVER_FAILURE,
      payload: error.message,
    });
  }
};

export const logoutAction = (navigate) => async (dispatch) => {
  localStorage.clear();
  dispatch({ type: LOGOUT });

  window.location.reload();
  navigate('/');
};

export const jwtSignIn = (userData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: JWT_AUTH_REQUEST });

    const { data } = await api.signIn(userData);

    dispatch({ type: JWT_AUTH_SUCCESS, payload: data });

    navigate('/');
    window.location.reload();
  } catch (error) {
    dispatch({ type: JWT_AUTH_FAILURE, payload: error.message });
  }
};

export const jwtSignUp = (userData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: JWT_AUTH_REQUEST });

    const { data } = await api.signUp(userData);

    dispatch({ type: JWT_AUTH_SUCCESS, payload: data });

    navigate('/');
    window.location.reload();
  } catch (error) {
    dispatch({ type: JWT_AUTH_FAILURE, payload: error.message });
  }
};

import {
  GOOGLE_AUTH_CLIENT_SUCCESS_SERVER_FAILURE,
  GOOGLE_AUTH_CLIENT_SUCCESS_SERVER_REQUEST,
  GOOGLE_AUTH_CLIENT_SUCCESS_SERVER_SUCCESS,
  JWT_AUTH_FAILURE,
  JWT_AUTH_REQUEST,
  JWT_AUTH_SUCCESS,
  LOGOUT,
} from '../constants/AuthCOnstants';

const googleAuthSuccessBackendSaveReducer = (
  state = { loading: false, authData: undefined },
  action
) => {
  switch (action.type) {
    case GOOGLE_AUTH_CLIENT_SUCCESS_SERVER_REQUEST:
    case JWT_AUTH_REQUEST:
      return { loading: true };

    case GOOGLE_AUTH_CLIENT_SUCCESS_SERVER_SUCCESS:
    case JWT_AUTH_SUCCESS:
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));

      return { loading: false, success: true, authData: action?.payload };

    case GOOGLE_AUTH_CLIENT_SUCCESS_SERVER_FAILURE:
    case JWT_AUTH_FAILURE:
      return { loading: false, error: action.payload };

    case LOGOUT:
      return { loading: false, authData: null };
    default:
      return state;
  }
};

export { googleAuthSuccessBackendSaveReducer };

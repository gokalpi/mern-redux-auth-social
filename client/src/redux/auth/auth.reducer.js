import AuthActionTypes from './auth.types.js';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  currentUser: null,
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case AuthActionTypes.GET_CURRENT_USER_START:
    case AuthActionTypes.LOGIN_WITH_EMAIL_START:
    case AuthActionTypes.LOGIN_WITH_OAUTH_START:
    case AuthActionTypes.REGISTER_WITH_EMAIL_START:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        isLoading: true,
        error: null,
        token: null,
      };
    case AuthActionTypes.LOGIN_WITH_EMAIL_SUCCESS:
    case AuthActionTypes.LOGIN_WITH_OAUTH_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        token: payload.token,
        currentUser: payload.user,
      };
    case AuthActionTypes.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        currentUser: payload,
      };
    case AuthActionTypes.LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        currentUser: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case AuthActionTypes.GET_CURRENT_USER_FAIL:
    case AuthActionTypes.LOGIN_WITH_EMAIL_FAIL:
    case AuthActionTypes.LOGIN_WITH_OAUTH_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        currentUser: null,
        isAuthenticated: false,
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
}

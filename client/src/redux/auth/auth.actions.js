import axios from 'axios';

import AuthActionTypes from './auth.types.js';

const baseUrl = 'https://localhost:4000';

export const getCurrentUser = () => async (dispatch, getState) => {
  try {
    const isAuthenticated = getState().auth.isAuthenticated;

    if (isAuthenticated) {
      dispatch({ type: AuthActionTypes.GET_CURRENT_USER_START });

      const options = attachTokenToHeaders(getState);
      const response = await axios.get(`${baseUrl}/auth/current`, options);

      dispatch({
        type: AuthActionTypes.GET_CURRENT_USER_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {
    dispatch({
      type: AuthActionTypes.GET_CURRENT_USER_FAIL,
      payload: err.message,
    });
  }
};

export const loginUserWithEmail = ({ email, password }) => async (dispatch) => {
  try {
    dispatch({ type: AuthActionTypes.LOGIN_WITH_EMAIL_START });

    const response = await axios.post(`${baseUrl}/auth/login`, { email, password });
    console.log('Login response', response);
    const { token, ...user } = response.data;

    dispatch({
      type: AuthActionTypes.LOGIN_WITH_EMAIL_SUCCESS,
      payload: { token, user },
    });

    // dispatch(getCurrentUser());
  } catch (err) {
    dispatch({
      type: AuthActionTypes.LOGIN_WITH_EMAIL_FAIL,
      payload: err.message,
    });
  }
};

export const logInUserWithOauth = (token) => async (dispatch) => {
  try {
    dispatch({ type: AuthActionTypes.LOGIN_WITH_OAUTH_START });

    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    };

    const response = await axios.get(`${baseUrl}/auth/current`, { headers });

    dispatch({
      type: AuthActionTypes.LOGIN_WITH_OAUTH_SUCCESS,
      payload: { currentUser: response.data.currentUser, token },
    });
  } catch (err) {
    dispatch({
      type: AuthActionTypes.LOGIN_WITH_OAUTH_FAIL,
      payload: { error: err.response.data.message },
    });
  }
};

// Log user out
export const logOutUser = () => async (dispatch, getState) => {
  try {
    const options = attachTokenToHeaders(getState);
    console.log('logOutUser - options', options);
    await axios.get(`${baseUrl}/auth/logout`, options);

    console.log('logOutUser - deleting all cookies');
    deleteAllCookies();

    dispatch({ type: AuthActionTypes.LOGOUT_SUCCESS });
  } catch (err) {}
};

export const registerUserWithEmail = (formData, history) => async (dispatch, getState) => {
  dispatch({ type: AuthActionTypes.REGISTER_WITH_EMAIL_START });
  try {
    const response = await axios.post(`${baseUrl}/auth/register`, formData);
    console.log('Register response', response);

    dispatch({ type: AuthActionTypes.REGISTER_WITH_EMAIL_SUCCESS });

    dispatch(loginUserWithEmail({ email: formData.email, password: formData.password }, history));
  } catch (err) {
    dispatch({
      type: AuthActionTypes.REGISTER_WITH_EMAIL_FAIL,
      payload: err.message,
    });
  }
};

function deleteAllCookies() {
  var cookies = document.cookie.split(';');

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf('=');
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

export const attachTokenToHeaders = (getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};

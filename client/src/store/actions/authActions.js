import axios from '../../axios-db';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER, LOGOUT, JWT_EXPIRED } from './types';
import { setLoading, endLoading } from '../actions/loadingActions';

// Register User
export const registerUser = (userData, history) => dispatch => {
  dispatch(setLoading());
  axios
    .post('/api/user/register', userData)
    .then(response => {
      history.push('/login');
      dispatch(endLoading());
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
      dispatch(endLoading());
    });
};

// Login - Get User Token
export const loginUser = (userData, history) => dispatch => {
  dispatch(setLoading());
  axios
    .post('/api/user/login', userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to local storage
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      // Redirect to dashboard after succesfull login(my comment)
      history.push('/');
      dispatch(endLoading());
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
      dispatch(endLoading());
    });
};

// Set logged in user

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logouted = () => {
  return {
    type: LOGOUT
  };
};

export const autoLoginFailed = () => {
  return {
    type: JWT_EXPIRED
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future request
  setAuthToken(false);
  // Set current user to empty object !!! {} wich will set isAutenticated to false
  dispatch(setCurrentUser({}));
  dispatch(logouted());
};

// Auto Login Logic
export const autoLogin = () => dispatch => {
  if (localStorage.jwtToken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info ad expiration
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAthenticated

    dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      dispatch(autoLoginFailed());
      // Logout user
      dispatch(logoutUser());
      window.location.href = '/login';
    }
  }
};

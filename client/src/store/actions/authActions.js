import axios from '../../axios-db';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import { setLoading, endLoading } from '../actions/loadingActions';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/user/register', userData)
    .then(response => history.push('/login'))
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
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
  console.log(decoded);
  return {
    type: SET_CURRENT_USER,
    payload: decoded
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
};

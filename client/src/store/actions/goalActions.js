import axios from '../../axios-db';
import { setLoading, endLoading } from '../actions/loadingActions';

import { GET_ERRORS } from './types';


// Create Profile

export const createGoal = (goalData, history) => dispatch => {
  dispatch(setLoading());
  axios
    .post('/api/goal', goalData)
    .then(res => {
      dispatch(endLoading());
      history.push('/');
    })
    .catch(error => {
      dispatch(endLoading());
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

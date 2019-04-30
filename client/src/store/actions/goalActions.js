import axios from '../../axios-db';
import { setLoading, endLoading } from '../actions/loadingActions';

import { GET_ERRORS } from './types';

// Create new Goal

export const createGoal = (goalData, history) => dispatch => {
  dispatch(setLoading());
  axios
    .post('/api/goal', goalData)
    .then(res => {
      dispatch(endLoading());
      history.push('/');
      console.log('after creating new goal history object is:', history);
    })
    .catch(error => {
      dispatch(endLoading());
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

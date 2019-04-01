import {
  FETCH_SELECTED_GOAL,
}
from './types';

import { setLoading, endLoading } from '../actions/loadingActions';
import axios from '../../axios-db';


export const fetchSelectedGoal = (id) => dispatch => {
  dispatch(setLoading());
  axios
    .get(`api/goal/${id}`)
    .then(res => {
      dispatch({
        type: FETCH_SELECTED_GOAL,
        payload: res.data
      });
      dispatch(endLoading());
    })
    .catch(err => {
      dispatch({
        type: FETCH_SELECTED_GOAL,
        payload: {}
      });
      dispatch(endLoading());
    });
};
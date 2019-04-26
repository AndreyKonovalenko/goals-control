import { FETCH_SELECTED_GOAL, CHECK_UP_GOAL_DAY } from './types';

import { setLoading, endLoading } from '../actions/loadingActions';
import axios from '../../axios-db';

export const fetchSelectedGoal = id => dispatch => {
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

export const checkUpGoalDay = (incomeIndex, arr) => {
  arr = arr.map((element, index) => {
    if (index === incomeIndex) {
      return {
        ...element,
        success: !element.success,
        touched: !element.touched ? true : true
      }
    }
    else {
      return element;
    }
  });
  console.log(arr);
  return {
    type: CHECK_UP_GOAL_DAY,
    payload: arr
  }
}

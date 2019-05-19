import {
  FETCH_SELECTED_GOAL,
  CHECK_UP_GOAL_DAY,
  PROGRESS_SAVED
} from './types';

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
      let touchedConfig = element.touched;
      let successConfig = element.success;

      if (element.touched === false && element.success === false) {
        // success option
        touchedConfig = true;
        successConfig = true;
      } else if (element.touched === true && element.success === true) {
        // failed option
        touchedConfig = true;
        successConfig = false;
      } else if (element.touched === true && element.success === false) {
        //reset option
        touchedConfig = false;
        successConfig = false;
      }

      return {
        ...element,
        success: successConfig,
        touched: touchedConfig
      };
    } else {
      return element;
    }
  });
  return {
    type: CHECK_UP_GOAL_DAY,
    payload: arr
  };
};

export const saveNewDaysArr = (id, daysArr) => dispatch => {
  dispatch(setLoading());
  axios
    .post(`api/goal/${id}`, daysArr)
    .then(res => {
      dispatch({
        type: PROGRESS_SAVED
      });
      dispatch(endLoading());
    })
    .catch(err => {
      dispatch(endLoading());
    });
};

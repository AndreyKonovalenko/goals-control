import {
  EDIT_GOALS_LIST,
  GET_GOALS_LIST,
  GET_ERRORS,
  UPDATE_GOALS_ORDER,
  DELETE_GOAL
}
from './types';
import { setLoading, endLoading } from '../actions/loadingActions';
import axios from '../../axios-db';
import arrayExtractor from '../../utils/arrayExtractor';

export const editMode = mode => {
  return {
    type: EDIT_GOALS_LIST,
    payload: !mode
  };
};

export const fetchGoalsList = () => dispatch => {
  dispatch(setLoading());
  axios
    .get('api/profile')
    .then(res => {
      dispatch({
        type: GET_GOALS_LIST,
        payload: res.data
      });
      dispatch(endLoading());
    })
    .catch(err => {
      dispatch({
        type: GET_GOALS_LIST,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      dispatch(endLoading());
    });
};

export const updateGaolsOrder = newArray => dispatch => {
  axios
    .post('api/profile', newArray)
    .then(res => {
      dispatch({
        type: UPDATE_GOALS_ORDER
      });
      dispatch(fetchGoalsList());
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteGoal = (arr, id) => dispatch => {
  dispatch(setLoading());
  axios
    .delete(`api/goal/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_GOAL
      });
      dispatch(updateGaolsOrder(arrayExtractor(arr, id)));
      dispatch(endLoading());
    })
    .catch(err => {
      dispatch(endLoading());
    });
};

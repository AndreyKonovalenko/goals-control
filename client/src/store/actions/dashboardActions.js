import {
  EDIT_GOALS_LIST,
  GET_GOALS_LIST,
  GET_ERRORS,
  UPDATE_GOALS_LIST,
  DELETE_GOAL,
  CREATE_ORDER,
  REORDER
} from './types';
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
      dispatch(createOrder(res.data.goals));
      dispatch(endLoading());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      dispatch(endLoading());
    });
};

// // this is update for profile array of goals

export const updateGaolsList = newArray => dispatch => {
  axios
    .post('api/profile', newArray)
    .then(res => {
      dispatch({
        type: UPDATE_GOALS_LIST
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
  axios
    .delete(`api/goal/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_GOAL
      });
      const slisedArr = arrayExtractor(arr, id);
      dispatch(updateGaolsList(slisedArr));
      dispatch(createOrder(slisedArr));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// CreateOrder is only fron-end action !!!
// it work independent from back-end DB

export const createOrder = arr => {
  const l = arr.length;
  const listOrder = Array.from({ length: l }, (v, k) => k);
  const result = {
    order: listOrder,
    itemsCount: l
  };
  return {
    type: CREATE_ORDER,
    payload: result
  };
};

export const reorder = arr => {
  return {
    type: REORDER,
    payload: arr
  };
};

import { EDIT_GOALS_LIST, GET_GOALS_LIST, GET_ERRORS } from './types';
import { setLoading, endLoading } from '../actions/loadingActions';
import axios from '../../axios-db';

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

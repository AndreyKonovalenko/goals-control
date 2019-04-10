import {
  EDIT_GOALS_LIST,
  GET_GOALS_LIST,
  GET_ERRORS,
  UPDATE_GOALS_ORDER,
  DELETE_GOAL,
  CREATE_ORDER
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
      console.log(res.data)
      dispatch(createOrder(res.data.gaolsList.goals));
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

// // this is update for profile array of goals
// export const updateGaolsOrder = newArray => dispatch => {
//   axios
//     .post('api/profile', newArray)
//     .then(res => {
//       dispatch({
//         type: UPDATE_GOALS_ORDER
//       });
//       dispatch(fetchGoalsList());
//     })
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// Update local element order;

export const createOrder = arr => {
  console.log(arr);
  const l = arr.lenght;
  const listOrder = Array.from({ length: l }, (v, k) => k);
  const result = {
    order: listOrder,
    itemsCount: l
  }
  console.log(result);
  return {
    type: CREATE_ORDER,
    payload: result
  };
};



export const deleteGoal = (arr, id) => dispatch => {
  dispatch(setLoading());
  axios
    .delete(`api/goal/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_GOAL
      });
      //   dispatch(updateGaolsOrder(arrayExtractor(arr, id)));
      dispatch(endLoading());
    })
    .catch(err => {
      dispatch(endLoading());
    });
};

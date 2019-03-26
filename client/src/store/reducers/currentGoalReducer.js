import {
  FETCH_SELECTED_GOAL
}
from '../actions/types';

const inititalState = {
  currentGoal: {}
};

const reducer = (state = inititalState, action) => {
  switch (action.type) {
    case FETCH_SELECTED_GOAL:
      return {
        ...state,
        currentGoal: action.payload
      }
    default:
      return state;
  }

}

export default reducer;

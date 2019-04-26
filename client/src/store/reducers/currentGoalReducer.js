import {
  FETCH_SELECTED_GOAL,
  CHECK_UP_GOAL_DAY
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
      };
    case CHECK_UP_GOAL_DAY:
      return {
        ...state,
        currentGoal: {
          ...state.currentGoal,
          days: action.payload
        }
      };
    default:
      return state;
  }
};

export default reducer;

import {
  EDIT_GOALS_LIST
}
from '../actions/types';

const initialState = {
  editing: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_GOALS_LIST:
      return {
        ...state,
        editing: action.payload
      };
    default:
      return state;
  }
};

export default reducer;

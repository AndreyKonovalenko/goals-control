import {
  EDIT_GOALS_LIST,
  GET_GOALS_LIST,
  CREATE_ORDER,
  REORDER
}
from '../actions/types';

const initialState = {
  editing: false,
  goalsList: {},
  order: [],
  itemsCount: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_GOALS_LIST:
      return {
        ...state,
        editing: action.payload
      };
    case GET_GOALS_LIST:
      return {
        ...state,
        goalsList: action.payload
      };
    case CREATE_ORDER:
      return {
        ...state,
        order: action.payload.order,
        itemsCount: action.payload.itemsCount
      };
    case REORDER:
      {
        return {
          ...state,
          order: action.payload
        }
      }
    default:
      return state;
  }
};

export default reducer;

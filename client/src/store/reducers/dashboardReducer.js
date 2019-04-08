import { EDIT_GOALS_LIST, GET_GOALS_LIST } from '../actions/types';

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
    default:
      return state;
  }
};

export default reducer;

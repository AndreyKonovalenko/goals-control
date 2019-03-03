import { LOADING, LOADED } from '../actions/types';

const initialState = {
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case LOADED:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;

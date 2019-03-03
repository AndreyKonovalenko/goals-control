import { isEmpty } from '../../utils/is-empty';
import { SET_CURRENT_USER, LOADING } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  lading: false,
  user: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;

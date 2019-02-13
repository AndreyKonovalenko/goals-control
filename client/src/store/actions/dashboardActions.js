import { EDIT_GOALS_LIST } from './types';


export const editMode = (mode) => {
  return {
    type: EDIT_GOALS_LIST,
    payload: !mode
  };
};

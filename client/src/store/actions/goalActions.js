import axios from '../../axios-db';

import { GET_ERRORS } from './types';


// Create Profile

export const createGoal = (goalData, history) => dispatch => {
  axios
    .post('/api/gaol', goalData)
    .then(res => history.push('/'))
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

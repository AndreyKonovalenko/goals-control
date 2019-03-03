import { LOADING, LOADED } from './types';

export const setLoading = () => ({ type: LOADING });
export const endLoading = () => ({ type: LOADED });

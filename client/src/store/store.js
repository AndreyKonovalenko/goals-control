import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import dashboardReducer from './reducers/dashboardReducer';
import authReducer from './reducers/authReducer';
import errorReducer from './reducers/errorReducer';
import loadingReducer from './reducers/loadingReducer';

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  auth: authReducer,
  errors: errorReducer,
  loading: loadingReducer
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
import dashboardReducer from '../reducers/dashboardReducer';



const rootReducer = combineReducers({
  dashboard: dashboardReducer
});


const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;

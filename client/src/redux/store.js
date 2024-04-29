import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { alertsReducer } from './reducers/alertsReducer';
import { carsReducer } from './reducers/carsReducer';
import { bookingsReducer } from './reducers/bookingsReducer';
import  {locationReducer}  from './reducers/locationReducer';
import { typeReducer } from './reducers/typeReducer';

const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
    carsReducer,
    alertsReducer,
    bookingsReducer,
    locationReducer,
    typeReducer
});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
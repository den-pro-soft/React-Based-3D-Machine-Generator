import {combineReducers} from 'redux';
import preferencesReducer from './reducers/preferencesReducer';
import mouseCoordinatesReducer from './reducers/mouseCoordinatesReducer';
import machineWindowReducer from './reducers/machineWindowReducer';
import confirmationReducer from './reducers/confirmationReducer';
import priceReducer from './reducers/priceReducer';
import orderWindowReducer from './reducers/orderWindowReducer';

import toolsPanelReducer from './reducers/toolsPanelReducer';
import inputSelectReducer from './reducers/inputSelectReducer';

import movingReducer from './reducers/movingReducer';

import summaryWindowReducer from './reducers/summaryWindowReducer';


export default combineReducers({
  preferencesReducer,mouseCoordinatesReducer, 
  machineWindowReducer, confirmationReducer,
  priceReducer,orderWindowReducer,
  toolsPanelReducer,movingReducer,
  inputSelectReducer,
  summaryWindowReducer
})

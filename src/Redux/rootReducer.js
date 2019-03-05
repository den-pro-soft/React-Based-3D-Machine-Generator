import {combineReducers} from 'redux';
import preferencesReducer from './reducers/preferencesReducer';
import mouseCoordinatesReducer from './reducers/mouseCoordinatesReducer';
import machineWindowReducer from './reducers/machineWindowReducer';
import confirmationReducer from './reducers/confirmationReducer';
import priceReducer from './reducers/priceReducer';

import toolsPanelReducer from './reducers/toolsPanelReducer';



export default combineReducers({
  preferencesReducer,mouseCoordinatesReducer, 
  machineWindowReducer, confirmationReducer,priceReducer,toolsPanelReducer
})

import {combineReducers} from 'redux';
import preferencesReducer from './reducers/preferencesReducer';
import machineWindowReducer from './reducers/machineWindowReducer';
import confirmationReducer from './reducers/confirmationReducer';
import materialReducer from './reducers/materialReducer';




export default combineReducers({
  preferencesReducer, machineWindowReducer, confirmationReducer, materialReducer
})

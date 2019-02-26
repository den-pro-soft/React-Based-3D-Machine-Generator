import {combineReducers} from 'redux';
import preferencesReducer from './reducers/preferencesReducer';
import machineWindowReducer from './reducers/machineWindowReducer';
import confirmationReducer from './reducers/confirmationReducer';



export default combineReducers({
  preferencesReducer, machineWindowReducer, confirmationReducer
})

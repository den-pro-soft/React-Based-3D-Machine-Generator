import {combineReducers} from 'redux';
import preferencesReducer from './reducers/preferencesReducer';
import machineWindowReducer from './reducers/machineWindowReducer';

export default combineReducers({
  preferencesReducer, machineWindowReducer
})

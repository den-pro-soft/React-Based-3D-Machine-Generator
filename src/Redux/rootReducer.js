import {combineReducers} from 'redux';
import preferencesReducer from './reducers/preferencesReducer';
import machineWindowReducer from './reducers/machineWindowReducer';
import summaryReducer from './reducers/summaryReducer';


export default combineReducers({
  preferencesReducer, machineWindowReducer,summaryReducer
})

import {combineReducers} from 'redux';
import preferencesReducer from './reducers/preferencesReducer';
import preferencesWindowReducer from './reducers/preferencesWindowReducer';
import mouseCoordinatesReducer from './reducers/mouseCoordinatesReducer';
import machineWindowReducer from './reducers/machineWindowReducer';
import confirmationReducer from './reducers/confirmationReducer';
import priceReducer from './reducers/priceReducer';
import orderWindowReducer from './reducers/orderWindowReducer';
import toolsPanelReducer from './reducers/toolsPanelReducer';
import diameterToolsReducer from './reducers/diameterToolsReducer';
import inputSelectReducer from './reducers/inputSelectReducer';
import movingReducer from './reducers/movingReducer';
import summaryWindowReducer from './reducers/summaryWindowReducer';
import nonWorkFeatureReducer from './reducers/nonWorkFeatureReducer';
import expertNoticeReducer from './reducers/expertNoticeReducer';
import setGroovesReducer from './reducers/setGroovesReducer';
import groovesParametersReducer from './reducers/groovesParametersReducer';
import errorGroovesWindowReducer from './reducers/errorGroovesWindowReducer';
import removeGroovesReducer from './reducers/removeGroovesReducer';
import confirmSaveDesignReducer from './reducers/confirmSaveDesignReducer';
import fileNameModalReducer from './../React/modal/FileNameModalReducer';



export default combineReducers({
    fileNameModalReducer,
    preferencesReducer,
    preferencesWindowReducer,
    mouseCoordinatesReducer,
    machineWindowReducer,
    confirmationReducer,
    nonWorkFeatureReducer,
    expertNoticeReducer,
    priceReducer,
    orderWindowReducer,
    toolsPanelReducer,
    diameterToolsReducer,
    movingReducer,
    inputSelectReducer,
    summaryWindowReducer,
    setGroovesReducer,
    groovesParametersReducer,
    errorGroovesWindowReducer,
    removeGroovesReducer,
    confirmSaveDesignReducer
})

import { combineReducers } from 'redux';
import themeReducer from './themeReducer';
import dataReducer from './dataReducer';
import detailDataReducer from './detailDataReducer';
import dataSavedReducer from './dataSavedReducer';

const reducers = {
  themeStore: themeReducer,
  dataStore: dataReducer,
  detailDataStore: detailDataReducer,
  dataSavedStore: dataSavedReducer
};

const rootReducer = combineReducers(reducers);

export default rootReducer;

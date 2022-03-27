import { combineReducers } from 'redux';

import questionsReducer from './features/questions/questionsSlice';
import settingsReducer from './features/settings/settingsSlice';

const rootReducer = combineReducers({
  questions: questionsReducer,
  settings: settingsReducer,
});

export default rootReducer;

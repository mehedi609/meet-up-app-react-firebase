import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { rootReducer } from './rootReducer';

export default configureStore({
  reducer: rootReducer(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

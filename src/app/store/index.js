import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { rootReducer } from 'app/store/rootReducer';

export default configureStore({
  reducer: rootReducer(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these field paths in all actions
        // Ignore these action types
        // ignoredActions: ['your/action/type'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.date'],
        // Ignore these paths in the state
        ignoredPaths: ['event.events'],
      },
    }).concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

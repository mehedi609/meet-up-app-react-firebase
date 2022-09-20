import counterReducer from 'features/sandbox/testSlice';
import { combineReducers } from '@reduxjs/toolkit';
import eventReducer from 'features/events/eventSlice';

export const rootReducer = () =>
  combineReducers({
    counter: counterReducer,
    event: eventReducer,
  });

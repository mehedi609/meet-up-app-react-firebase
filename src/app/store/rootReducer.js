import counterReducer from 'features/sandbox/testSlice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = () =>
  combineReducers({
    counter: counterReducer,
  });

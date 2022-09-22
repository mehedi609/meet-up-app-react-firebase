import counterReducer from 'features/sandbox/testSlice';
import { combineReducers } from '@reduxjs/toolkit';
import { eventReducer } from 'features/events/eventSlice';
import { modalReducer } from '../common/modals/modalSlice';
import { authReducer } from '../../features/auth/authSlice';

export const rootReducer = () =>
  combineReducers({
    counter: counterReducer,
    event: eventReducer,
    modal: modalReducer,
    auth: authReducer,
  });

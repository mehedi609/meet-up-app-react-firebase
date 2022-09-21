import { sampleData } from '../../api/sample-data';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: sampleData,
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    createEvent: (state, action) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action) => {
      const findIndex = state.events.findIndex(
        (evt) => evt.id === action.payload.id,
      );

      if (findIndex > -1) {
        state.events[findIndex] = action.payload;
      }
    },
    deleteEvent: (state, action) => {
      const findIndex = state.events.findIndex(
        (evt) => evt.id === action.payload,
      );

      if (findIndex > -1) {
        state.events.splice(findIndex, 1);
      }
    },
  },
});

export const { createEvent, updateEvent, deleteEvent } = eventSlice.actions;

export const eventState = (state) => state.event.events;

const eventReducer = eventSlice.reducer;

export default eventReducer;

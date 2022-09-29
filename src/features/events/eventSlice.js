import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    listenToEvents: (state, action) => {
      state.events = action.payload;
    },
  },
});

const {
  reducer,
  actions: { listenToEvents },
} = eventSlice;

export { listenToEvents };

export const selectEventState = (state) => state.event.events;

export { reducer as eventReducer };

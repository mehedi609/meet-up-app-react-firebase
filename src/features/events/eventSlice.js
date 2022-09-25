import { createSlice } from '@reduxjs/toolkit';
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from 'app/async/asyncSlice';
import { fetchSampleData } from 'app/api/mockApi';

const initialState = {
  events: [],
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    _loadEvents: (state, action) => {
      state.events = action.payload;
    },
    _createEvent: (state, action) => {
      state.events.push(action.payload);
    },
    _updateEvent: (state, action) => {
      const findIndex = state.events.findIndex(
        (evt) => evt.id === action.payload.id,
      );

      if (findIndex > -1) {
        state.events[findIndex] = action.payload;
      }
    },
    _deleteEvent: (state, action) => {
      const findIndex = state.events.findIndex(
        (evt) => evt.id === action.payload,
      );

      if (findIndex > -1) {
        state.events.splice(findIndex, 1);
      }
    },
  },
});

const {
  reducer,
  actions: { _loadEvents, _createEvent, _updateEvent, _deleteEvent },
} = eventSlice;

export const loadEvents = () => async (dispatch) => {
  dispatch(asyncActionStart());
  try {
    const events = await fetchSampleData();
    dispatch(_loadEvents(events));
    dispatch(asyncActionFinish());
  } catch (e) {
    console.log(e);
    dispatch(asyncActionError(e));
  }
};

export {
  _createEvent as createEvent,
  _deleteEvent as deleteEvent,
  _updateEvent as updateEvent,
};

export const selectEvent = (state) => state.event.events;

export { reducer as eventReducer };

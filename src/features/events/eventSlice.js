import { createSlice } from '@reduxjs/toolkit';

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
    listenToEvents: (state, action) => {
      state.events = action.payload;
    },
    listenToEvent: (state, action) => {
      state.events.push(action.payload);
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
  actions: {
    _createEvent,
    _updateEvent,
    _deleteEvent,
    listenToEvents,
    listenToEvent,
  },
} = eventSlice;

/*export const loadEvents = () => async (dispatch) => {
  dispatch(asyncActionStart());
  try {
    const events = await fetchSampleData();
    dispatch(_loadEvents(events));
    dispatch(asyncActionFinish());
  } catch (e) {
    console.log(e);
    dispatch(asyncActionError(e));
  }
};*/

export {
  _createEvent as createEvent,
  _deleteEvent as deleteEvent,
  _updateEvent as updateEvent,
  listenToEvents,
  listenToEvent,
};

export const selectEventState = (state) => state.event.events;

export { reducer as eventReducer };

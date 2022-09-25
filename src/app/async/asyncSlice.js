import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
};

const asyncSlice = createSlice({
  name: 'async',
  initialState,
  reducers: {
    asyncActionStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    asyncActionFinish: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    asyncActionError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  reducer,
  actions: { asyncActionStart, asyncActionFinish, asyncActionError },
} = asyncSlice;
export const selectAsyncState = (state) => state.async;
export { reducer as asyncReducer };

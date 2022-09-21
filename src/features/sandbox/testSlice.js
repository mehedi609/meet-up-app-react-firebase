import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 10,
  },
  reducers: {
    increment(state, action) {
      state.value += action.payload;
    },
    decrement(state, action) {
      state.value -= action.payload;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export const selectCounter = (state) => state.counter.value;

const counterReducer = counterSlice.reducer;
export default counterReducer;

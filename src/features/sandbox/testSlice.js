import { createSlice } from '@reduxjs/toolkit';
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../../app/async/asyncSlice';
import { delay } from '../../app/common/util/util';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 10,
  },
  reducers: {
    _increment(state, action) {
      state.value += action.payload;
    },
    _decrement(state, action) {
      state.value -= action.payload;
    },
  },
});

const {
  reducer,
  actions: { _increment, _decrement },
} = counterSlice;

export const increment = (amount) => async (dispatch) => {
  dispatch(asyncActionStart());
  try {
    await delay(1000);
    dispatch(_increment(amount));
    dispatch(asyncActionFinish());
  } catch (e) {
    dispatch(asyncActionError(e));
  }
};

export const decrement = (amount) => async (dispatch) => {
  dispatch(asyncActionStart());
  try {
    await delay(1000);
    dispatch(_decrement(amount));
    dispatch(asyncActionFinish());
  } catch (e) {
    dispatch(asyncActionError(e));
  }
};

export const selectCounter = (state) => state.counter.value;

export { reducer as counterReducer };

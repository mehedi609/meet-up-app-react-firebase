import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { modalState: null },
  reducers: {
    openModal: (state, action) => {
      state.modalState = action.payload;
    },
    closeModal: (state, action) => {
      state.modalState = null;
    },
  },
});

export const {
  reducer,
  actions: { openModal, closeModal },
} = modalSlice;
export const selectModal = (state) => state.modal.modalState;
export { reducer as modalReducer };

import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   authenticated: true,
//   currentUser: {
//     email: 'bob@test.com',
//     photoURL: '/assets/user.png',
//   },
// };

const initialState = {
  authenticated: false,
  currentUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInUser: (state, action) => {
      state.authenticated = true;
      state.currentUser = action.payload;
    },
    signOutUser: (state) => {
      state.authenticated = false;
      state.currentUser = null;
    },
  },
});

export const {
  reducer,
  actions: { signInUser, signOutUser },
} = authSlice;
export const selectAuthState = (state) => state.auth;
export { reducer as authReducer };

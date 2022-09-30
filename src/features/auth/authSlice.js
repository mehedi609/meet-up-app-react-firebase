import { createSlice } from '@reduxjs/toolkit';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'app/config/firebase';

const initialState = {
  authenticated: false,
  currentUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    _signInUser: (state, action) => {
      state.authenticated = true;
      state.currentUser = action.payload;
    },
    _signOutUser: (state) => {
      state.authenticated = false;
      state.currentUser = null;
    },
  },
});

const {
  reducer,
  actions: { _signInUser, _signOutUser },
} = authSlice;

export const verifyAuth = () => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(_signInUser(user));
    } else {
      dispatch(_signOutUser());
    }
  });
};

export const selectAuthState = (state) => state.auth;
export { reducer as authReducer };

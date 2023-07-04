import { Dispatch, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthDetails from '../../models/user/AuthDetails';
import { loginRequest, refreshTokenRequest, registerRequest } from '../../services/authentication/AuthenticationService';
import { getUserDetails } from '../../services/user/UserService';
import SessionData from '../../models/session/SessionData';

export interface SessionState {
  sessionData: SessionData
}
  

const initialState: SessionState = {
  sessionData: {
    darkMode: true
  }
};
  

const sessionSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateSession: (state, action) => {
      state.sessionData = action.payload;
      return state;
    },
    changeTheme: (state) => {
      state.sessionData.darkMode = !state.sessionData.darkMode;
      return state;
    },
  },
});

export const { updateSession, changeTheme } = sessionSlice.actions;

export default sessionSlice.reducer;

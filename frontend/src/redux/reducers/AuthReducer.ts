import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthDetails from '../../models/user/AuthDetails';
import { loginRequest, refreshTokenRequest, registerRequest } from '../../services/authentication/AuthenticationService';
import Token from '../../models/user/Token';
import User from '../../models/user/User';
import { store } from '../store/Store';

export interface AuthState {
  token: Token | null,
  user: User | null,
}
  

const initialState: AuthState = {
  token: null,
  user: null,
};

export const login = (userData: AuthDetails) => {
  return async (dispatch) => {
    try {
      const response = await loginRequest(userData);
  
      if (response.status != 200) {
        throw new Error('Invalid credentials');
      }
  
      return dispatch(loginSuccess(response.data));
    } catch (error) {
      return error;
    }
  }
};

export const register =  (userData: AuthDetails) => {
  return async (dispatch) => {
    try {
      const response = await registerRequest(userData);
  
      if (response.status != 200) {
        throw new Error('Error trying to register user');
      }
  
      return dispatch(loginSuccess(response.data));
    } catch (error) {
      return error;
    }
  }
};

export const refreshToken =  (tokenData: Token | null) => {
  return async (dispatch) => {
    try {
      if (!tokenData) return dispatch(logoutSuccess())
      const response = await refreshTokenRequest(tokenData);
  
      if (response.status != 200) {
        throw new Error('Error trying to register user');
      }
  
      return dispatch(loginSuccess(response.data));
    } catch (error) {
      return error;
    }
  }
};

export const logout =  () => {
  return async (dispatch) => {
    try {
      return dispatch(logoutSuccess());
    } catch (error) {
      return error;
    }
  }
};
  

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
      return state;
    },
    logoutSuccess: (state) => {
      return initialState;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;

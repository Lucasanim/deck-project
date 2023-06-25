import { Dispatch, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthDetails from '../../models/user/AuthDetails';
import { loginRequest, refreshTokenRequest, registerRequest } from '../../services/authentication/AuthenticationService';
import Token from '../../models/user/Token';
import User from '../../models/user/User';
import { store } from '../store/Store';
import { getUserDetails } from '../../services/user/UserService';

export interface AuthState {
  token: Token | null,
  user: User | null,
}
  

const initialState: AuthState = {
  token: null,
  user: null,
};

export const login = (userData: AuthDetails) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await loginRequest(userData);
  
      const tokenData: Token = response.data;
      const userResponse = await getUserDetails(tokenData.userId);

      dispatch(requestUserDetails(userResponse.data));
      return dispatch(loginSuccess(response.data));
    } catch (error) {
      return error;
    }
  }
};

export const register =  (userData: AuthDetails) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await registerRequest(userData);
  
      const tokenData: Token = response.data;
      const userResponse = await getUserDetails(tokenData.userId);

      dispatch(requestUserDetails(userResponse.data));
      return dispatch(loginSuccess(response.data));
    } catch (error) {
      return error;
    }
  }
};

export const refreshToken =  (tokenData: Token | null) => {
  return async (dispatch: Dispatch) => {
    try {
      if (!tokenData) return dispatch(logoutSuccess())
      const response = await refreshTokenRequest(tokenData);
  
      return dispatch(loginSuccess(response.data));
    } catch (error) {
      return error;
    }
  }
};

export const logout =  () => {
  return async (dispatch: Dispatch) => {
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
    requestUserDetails: (state, action) => {
      state.token = action.payload;
      return state;
    },
    loginSuccess: (state, action) => {
      state.token = action.payload;
      return state;
    },
    logoutSuccess: (state) => {
      return initialState;
    },
  },
});

export const { loginSuccess, logoutSuccess, requestUserDetails } = authSlice.actions;

export default authSlice.reducer;

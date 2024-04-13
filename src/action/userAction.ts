import { LoginPack } from "../types";

// store/actions.ts
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginRequestAction = (payload: LoginPack) => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (payload: LoginPack) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (payload: string) => ({
  type: LOGIN_FAILURE,
  payload,
});

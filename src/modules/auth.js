import {createAction, handleActions} from 'redux-actions';
import produce from 'immer';
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from '../lib/createRequestSaga';
import * as authApi from '../lib/api/auth';

const CHANGE_FIELD = "auth/CHANGE_FIELD";
const INITIALIZE_FORM = "auth/INITIALIZE_FORM";
const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE] = createRequestActionTypes("auth/SIGNUP");
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes("auth/LOGIN");

export const changeField = createAction(CHANGE_FIELD, ({form, key, value}) => ({form, key, value}));
export const initializeForm = createAction(INITIALIZE_FORM, (form) => (form));
export const signup = createAction(SIGNUP, ({username, password}) => ({username, password}));
export const login = createAction(LOGIN, ({username, password}) => ({username, password}));

const signupSaga = createRequestSaga(SIGNUP, authApi.signup);
const loginSaga = createRequestSaga(LOGIN, authApi.login);

export function* authSaga() {
  yield takeLatest(SIGNUP, signupSaga);
  yield takeLatest(LOGIN, loginSaga);
}

const initialState = {
  login: {
    username: '',
    password: ''
  },
  signup: {
    username: '',
    password: '',
    passwordConfirm: ''
  },
  forget: {
    username: ''
  },
  response: null,
  errorResponse: null
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, {payload: {form, key, value}}) => (
      produce(state, draft => {
        draft[form][key] = value;
      })
    ),
    [INITIALIZE_FORM]: (state, {payload: form}) => ({
      ...state,
      [form]: initialState[form],
      response: null,
      errorResponse: null
    }),
    [SIGNUP_SUCCESS]: (state, {payload: response}) => ({
      ...state, response, errorResponse: null
    }),
    [SIGNUP_FAILURE]: (state, {payload: errorResponse}) => ({
      ...state, response: null, errorResponse
    }),
    [LOGIN_SUCCESS]: (state, {payload: response}) => ({
      ...state, response, errorResponse: null
    }),
    [LOGIN_FAILURE]: (state, {payload: errorResponse}) => ({
      ...state, response: null, errorResponse
    })
  },
  initialState
);

export default auth;

import {createAction, handleActions} from 'redux-actions';
import produce from 'immer';
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from '../lib/createRequestSaga';
import * as authApi from '../lib/api/auth';

const CHANGE_FIELD = "auth/CHANGE_FIELD";
const INITIALIZE_FORM = "auth/INITIALIZE_FORM";
const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE] = createRequestActionTypes("auth/SIGNUP");
const [VERIFY, VERIFY_SUCCESS, VERIFY_FAILURE] = createRequestActionTypes("auth/VERIFY");
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes("auth/LOGIN");

export const changeField = createAction(CHANGE_FIELD, ({form, key, value}) => ({form, key, value}));
export const initializeForm = createAction(INITIALIZE_FORM, (form) => (form));
export const signup = createAction(SIGNUP, ({username, password}) => ({username, password}));
export const verify = createAction(VERIFY, ({id, token}) => ({id, token}));
export const login = createAction(LOGIN, ({username, password}) => ({username, password}));

const signupSaga = createRequestSaga(SIGNUP, authApi.signup);
const verifySaga = createRequestSaga(VERIFY, authApi.verify);
const loginSaga = createRequestSaga(LOGIN, authApi.login);

export function* authSaga() {
  yield takeLatest(SIGNUP, signupSaga);
  yield takeLatest(VERIFY, verifySaga);
  yield takeLatest(LOGIN, loginSaga);
}

const initialState = {
  signup: {
    username: '',
    password: '',
    passwordConfirm: ''
  },
  verify: {
    id: '',
    token: ''
  },
  login: {
    username: '',
    password: ''
  },
  forget: {
    username: ''
  },
  // TODO make param
  id: null,
  verificationLink: null,
  jwt: null,
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
      [form]: initialState[form]
    }),
    [SIGNUP_SUCCESS]: (state, {payload: response}) => ({
      ...state,
      id: response.data.id,
      verificationLink: response.data._links.verify.href,
      errorResponse: null
    }),
    [SIGNUP_FAILURE]: (state, {payload: errorResponse}) => ({
      ...state, errorResponse
    }),
    [VERIFY_SUCCESS]: (state, {payload: response}) => ({
      ...state,
      // TODO setRealJwt
      jwt: response.data + 'abc.abc.abc',
      errorResponse: null
    }),
    [VERIFY_FAILURE]: (state, {payload: errorResponse}) => ({
      ...state, errorResponse
    }),
    [LOGIN_SUCCESS]: (state, {payload: response}) => ({
      ...state,
      // TODO setRealJwt
      jwt: 'abc.abc.abc',
      errorResponse: null
    }),
    [LOGIN_FAILURE]: (state, {payload: errorResponse}) => ({
      ...state, errorResponse
    })
  },
  initialState
);

export default auth;

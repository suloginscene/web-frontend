import {createAction, handleActions} from 'redux-actions';
import produce from 'immer';
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from '../lib/createRequestSaga';
import * as authApi from '../lib/api/auth';

const CHANGE_FIELD = "auth/CHANGE_FIELD";
const INITIALIZE_FORM = "auth/INITIALIZE_FORM";
const [AUTH_INDEX, AUTH_INDEX_SUCCESS, AUTH_INDEX_FAILURE] = createRequestActionTypes("auth/AUTH_INDEX");
const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE] = createRequestActionTypes("auth/SIGNUP");
const [VERIFY, VERIFY_SUCCESS, VERIFY_FAILURE] = createRequestActionTypes("auth/VERIFY");
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes("auth/LOGIN");

export const changeField = createAction(CHANGE_FIELD, ({form, key, value}) => ({form, key, value}));
export const initializeForm = createAction(INITIALIZE_FORM, (form) => (form));
export const authIndex = createAction(AUTH_INDEX, (indexLink) => ({indexLink}));
export const signup = createAction(SIGNUP, (signupLink, {username, password}) => ({signupLink, username, password}));
export const verify = createAction(VERIFY, (verificationLink, {token}) => ({verificationLink, token}));
export const login = createAction(LOGIN, (loginLink, {username, password}) => ({loginLink, username, password}));

const authIndexSaga = createRequestSaga(AUTH_INDEX, authApi.index);
const signupSaga = createRequestSaga(SIGNUP, authApi.signup);
const verifySaga = createRequestSaga(VERIFY, authApi.verify);
const loginSaga = createRequestSaga(LOGIN, authApi.login);

export function* authSaga() {
  yield takeLatest(AUTH_INDEX, authIndexSaga);
  yield takeLatest(SIGNUP, signupSaga);
  yield takeLatest(VERIFY, verifySaga);
  yield takeLatest(LOGIN, loginSaga);
}

const initialState = {
  links: {
    signup: null,
    issueJwt: null,
    myInfo: null,
    onForgetPassword: null,
    verify: null
  },
  signup: {
    username: '',
    password: '',
    passwordConfirm: ''
  },
  verify: {
    token: ''
  },
  login: {
    username: '',
    password: ''
  },
  forget: {
    username: ''
  },
  verified: null,
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
    [AUTH_INDEX_SUCCESS]: (state, {payload: response}) => (
      produce(state, draft => {
        draft.links.signup = response.data._links.signup.href;
        draft.links.issueJwt = response.data._links.issueJwt.href;
        draft.links.myInfo = response.data._links.myInfo.href;
        draft.links.onForgetPassword = response.data._links.onForgetPassword.href;
        draft.errorResponse = null;
      })
    ),
    [AUTH_INDEX_FAILURE]: (state, {payload: errorResponse}) => ({
      ...state, errorResponse
    }),
    [SIGNUP_SUCCESS]: (state, {payload: response}) => (
      produce(state, draft => {
        draft.links.verify = response.data._links.verify.href;
        draft.errorResponse = null;
      })
    ),
    [SIGNUP_FAILURE]: (state, {payload: errorResponse}) => ({
      ...state, errorResponse
    }),
    [VERIFY_SUCCESS]: (state, {payload: response}) => ({
      ...state,
      verified: true,
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

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
const [FORGET, FORGET_SUCCESS, FORGET_FAILURE] = createRequestActionTypes("auth/FORGET");
const [MY_INFO, MY_INFO_SUCCESS, MY_INFO_FAILURE] = createRequestActionTypes("auth/MY_INFO");
const [CHANGE_PASSWORD, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE] = createRequestActionTypes("auth/CHANGE_PASSWORD");

export const changeField = createAction(CHANGE_FIELD, ({form, key, value}) => ({form, key, value}));
export const initializeForm = createAction(INITIALIZE_FORM, (form) => (form));
export const authIndex = createAction(AUTH_INDEX, (indexLink) => ({indexLink}));
export const signup = createAction(SIGNUP, (signupLink, {username, password}) => ({signupLink, username, password}));
export const verify = createAction(VERIFY, (verificationLink, {token}) => ({verificationLink, token}));
export const login = createAction(LOGIN, (loginLink, {username, password}) => ({loginLink, username, password}));
export const forget = createAction(FORGET, (forgetLink, {username}) => ({forgetLink, username}));
export const myInfo = createAction(MY_INFO, (myInfoLink, jwt) => ({myInfoLink, jwt}));
export const changePassword = createAction(CHANGE_PASSWORD, (changePasswordLink, jwt, {newPassword}) => ({
  changePasswordLink, jwt, newPassword
}));

const authIndexSaga = createRequestSaga(AUTH_INDEX, authApi.index);
const signupSaga = createRequestSaga(SIGNUP, authApi.signup);
const verifySaga = createRequestSaga(VERIFY, authApi.verify);
const loginSaga = createRequestSaga(LOGIN, authApi.login);
const forgetSaga = createRequestSaga(FORGET, authApi.forget);
const myInfoSaga = createRequestSaga(MY_INFO, authApi.myInfo);
const changePasswordSaga = createRequestSaga(CHANGE_PASSWORD, authApi.changePassword);

export function* authSaga() {
  yield takeLatest(AUTH_INDEX, authIndexSaga);
  yield takeLatest(SIGNUP, signupSaga);
  yield takeLatest(VERIFY, verifySaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(FORGET, forgetSaga);
  yield takeLatest(MY_INFO, myInfoSaga);
  yield takeLatest(CHANGE_PASSWORD, changePasswordSaga);
}

const initialState = {
  links: {
    signup: null,
    login: null,
    myInfo: null,
    forget: null,
    verify: null,
    changePassword: null,
    withdraw: null
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
  changePassword: {
    newPassword: '',
    newPasswordConfirm: '',
  },
  verified: null,
  jwt: null,
  found: null,
  email: null,
  passwordChanged: null,
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
        draft.links.login = response.data._links.issueJwt.href;
        draft.links.myInfo = response.data._links.myInfo.href;
        draft.links.forget = response.data._links.onForgetPassword.href;
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
      jwt: response.data,
      errorResponse: null
    }),
    [LOGIN_FAILURE]: (state, {payload: errorResponse}) => ({
      ...state, errorResponse
    }),
    [FORGET_SUCCESS]: (state, {payload: response}) => ({
      ...state,
      found: true,
      errorResponse: null
    }),
    [FORGET_FAILURE]: (state, {payload: errorResponse}) => ({
      ...state, errorResponse
    }),
    [MY_INFO_SUCCESS]: (state, {payload: response}) => (
      produce(state, draft => {
        draft.email = response.data.email;
        draft.links.changePassword = response.data._links.changePassword.href;
        draft.links.withdraw = response.data._links.withdraw.href;
        draft.errorResponse = null;
      })
    ),
    [MY_INFO_FAILURE]: (state, {payload: errorResponse}) => ({
      ...state, errorResponse
    }),
    [CHANGE_PASSWORD_SUCCESS]: (state, {payload: response}) => ({
      ...state,
      passwordChanged: true,
      errorResponse: null
    }),
    [CHANGE_PASSWORD_FAILURE]: (state, {payload: errorResponse}) => ({
      ...state, errorResponse
    }),
  },
  initialState
);

export default auth;

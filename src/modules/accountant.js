import createRequestSaga, {createRequestActionTypes} from "../lib/api/createRequestSaga";
import {createAction, handleActions} from "redux-actions";
import * as accountantApi from "../lib/api/accountant";
import {takeLatest} from "redux-saga/effects";
import produce from "immer";

const CHANGE_FIELD = "accountant/CHANGE_FIELD";
const INITIALIZE_FORM = "accountant/INITIALIZE_FORM";
const [ACCOUNTANT_INDEX, ACCOUNTANT_INDEX_SUCCESS, ACCOUNTANT_INDEX_FAILURE] = createRequestActionTypes("accountant/ACCOUNTANT_INDEX");
const [POST_ACCOUNT, POST_ACCOUNT_SUCCESS, POST_ACCOUNT_FAILURE] = createRequestActionTypes("accountant/POST_ACCOUNT");

export const changeField = createAction(CHANGE_FIELD, ({form, key, value}) => ({form, key, value}));
export const initializeForm = createAction(INITIALIZE_FORM, (form) => (form));
export const accountantIndex = createAction(ACCOUNTANT_INDEX, (indexLink) => ({indexLink}));
export const postAccount = createAction(POST_ACCOUNT, (postAccountLink, jwt, {type, name, money}) => ({
  postAccountLink, jwt, type, name, money
}));

const accountantIndexSaga = createRequestSaga(ACCOUNTANT_INDEX, accountantApi.index);
const postAccountSaga = createRequestSaga(POST_ACCOUNT, accountantApi.postAccount);

export function* accountantSaga() {
  yield takeLatest(ACCOUNTANT_INDEX, accountantIndexSaga);
  yield takeLatest(POST_ACCOUNT, postAccountSaga);
}

const initialState = {
  links: {
    postAccount: null,
    getAccounts: null,
    executeTransaction: null,
    getLedger: null,
    getBalanceSheet: null,
    getIncomeStatement: null,
    clear: null
  },
  account: {
    type: '',
    name: '',
    money: ''
  },
  posted: null,
  errorResponse: null
}

const accountant = handleActions({
    [CHANGE_FIELD]: (state, {payload: {form, key, value}}) => (
      produce(state, draft => {
        draft[form][key] = value;
      })
    ),
    [INITIALIZE_FORM]: (state, {payload: form}) => ({
      ...state,
      [form]: initialState[form],
      posted: null
    }),
    [ACCOUNTANT_INDEX_SUCCESS]: (state, {payload: response}) => (
      produce(state, draft => {
        draft.links.postAccount = response.data._links.postAccount.href;
        draft.links.getAccounts = response.data._links.getAccounts.href;
        draft.links.executeTransaction = response.data._links.executeTransaction.href;
        draft.links.getLedger = response.data._links.getLedger.href;
        draft.links.getBalanceSheet = response.data._links.getBalanceSheet.href;
        draft.links.getIncomeStatement = response.data._links.getIncomeStatement.href;
        draft.links.clear = response.data._links.clear.href;
        draft.errorResponse = null;
      })
    ),
    [ACCOUNTANT_INDEX_FAILURE]: (state, {payload: errorResponse}) => ({
      ...state, errorResponse
    }),
    [POST_ACCOUNT_SUCCESS]: (state) => ({
      ...state,
      posted: true,
      errorResponse: null
    }),
    [POST_ACCOUNT_FAILURE]: (state, {payload: errorResponse}) => ({
      ...state, errorResponse
    })
  }, initialState
);

export default accountant;

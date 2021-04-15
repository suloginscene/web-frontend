import createRequestSaga, {createRequestActionTypes} from "../lib/api/createRequestSaga";
import {createAction, handleActions} from "redux-actions";
import * as accountantApi from "../lib/api/accountant";
import {takeLatest} from "redux-saga/effects";
import produce from "immer";

const CHANGE_FIELD = "accountant/CHANGE_FIELD";
const INITIALIZE_FORM = "accountant/INITIALIZE_FORM";
const [ACCOUNTANT_INDEX, ACCOUNTANT_INDEX_SUCCESS, ACCOUNTANT_INDEX_FAILURE] = createRequestActionTypes("accountant/ACCOUNTANT_INDEX");
const [POST_ACCOUNT, POST_ACCOUNT_SUCCESS, POST_ACCOUNT_FAILURE] = createRequestActionTypes("accountant/POST_ACCOUNT");
const [GET_ACCOUNTS, GET_ACCOUNTS_SUCCESS, GET_ACCOUNTS_FAILURE] = createRequestActionTypes("accountant/GET_ACCOUNTS");
const [GET_ACCOUNT, GET_ACCOUNT_SUCCESS, GET_ACCOUNT_FAILURE] = createRequestActionTypes("accountant/GET_ACCOUNT");
const [CHANGE_NAME, CHANGE_NAME_SUCCESS, CHANGE_NAME_FAILURE] = createRequestActionTypes("accountant/CHANGE_NAME");
const [CHANGE_BUDGET, CHANGE_BUDGET_SUCCESS, CHANGE_BUDGET_FAILURE] = createRequestActionTypes("accountant/CHANGE_BUDGET");
const [DELETE_ACCOUNT, DELETE_ACCOUNT_SUCCESS, DELETE_ACCOUNT_FAILURE] = createRequestActionTypes("accountant/DELETE_ACCOUNT");

export const changeField = createAction(CHANGE_FIELD, ({form, key, value}) => ({form, key, value}));
export const initializeForm = createAction(INITIALIZE_FORM, (form) => (form));
export const accountantIndex = createAction(ACCOUNTANT_INDEX, (indexLink) => ({indexLink}));
export const postAccount = createAction(POST_ACCOUNT, (postAccountLink, jwt, {type, name, money}) => ({
  postAccountLink, jwt, type, name, money
}));
export const getAccounts = createAction(GET_ACCOUNTS, (getAccountsLink, jwt) => ({getAccountsLink, jwt}));
export const getAccount = createAction(GET_ACCOUNT, (getAccountLink, jwt) => ({getAccountLink, jwt}));
export const changeName = createAction(CHANGE_NAME, (changeNameLink, jwt, {newName}) => ({
  changeNameLink, jwt, newName
}));
export const changeBudget = createAction(CHANGE_BUDGET, (changeBudgetLink, jwt, {newBudget}) => ({
  changeBudgetLink, jwt, newBudget
}));
export const deleteAccount = createAction(DELETE_ACCOUNT, (deleteAccountLink, jwt) => ({deleteAccountLink, jwt}));

const accountantIndexSaga = createRequestSaga(ACCOUNTANT_INDEX, accountantApi.index);
const postAccountSaga = createRequestSaga(POST_ACCOUNT, accountantApi.postAccount);
const getAccountsSaga = createRequestSaga(GET_ACCOUNTS, accountantApi.getAccounts);
const getAccountSaga = createRequestSaga(GET_ACCOUNT, accountantApi.getAccount);
const changeNameSaga = createRequestSaga(CHANGE_NAME, accountantApi.changeName);
const changeBudgetSaga = createRequestSaga(CHANGE_BUDGET, accountantApi.changeBudget);
const deleteAccountSaga = createRequestSaga(DELETE_ACCOUNT, accountantApi.deleteAccount);

export function* accountantSaga() {
  yield takeLatest(ACCOUNTANT_INDEX, accountantIndexSaga);
  yield takeLatest(POST_ACCOUNT, postAccountSaga);
  yield takeLatest(GET_ACCOUNTS, getAccountsSaga);
  yield takeLatest(GET_ACCOUNT, getAccountSaga);
  yield takeLatest(CHANGE_NAME, changeNameSaga);
  yield takeLatest(CHANGE_BUDGET, changeBudgetSaga);
  yield takeLatest(DELETE_ACCOUNT, deleteAccountSaga);
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
  accountForm: {
    type: '',
    name: '',
    money: ''
  },
  modifyForm: {
    newName: '',
    newBudget: ''
  },
  posted: null,
  accounts: null,
  account: null,
  changed: null,
  deleted: null,
  incomeStatement: null,
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
      posted: null,
      changed: null,
      deleted: null
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
    }),
    [GET_ACCOUNTS_SUCCESS]: (state, {payload: response}) => ({
      ...state,
      accounts: response.data.accounts,
      errorResponse: null
    }),
    [GET_ACCOUNTS_FAILURE]: (state, {payload: errorResponse}) => ({
      ...state, errorResponse
    }),
    [GET_ACCOUNT_SUCCESS]: (state, {payload: response}) => ({
      ...state,
      account: response.data,
      errorResponse: null
    }),
    [GET_ACCOUNT_FAILURE]: (state, {payload: errorResponse}) => ({
      ...state, errorResponse
    }),
    [CHANGE_NAME_SUCCESS]: (state) => ({
      ...state,
      changed: true,
      errorResponse: null
    }),
    [CHANGE_NAME_FAILURE]: (state, {payload: errorResponse}) => ({
      ...state, errorResponse
    }),
    [CHANGE_BUDGET_SUCCESS]: (state) => ({
      ...state,
      changed: true,
      errorResponse: null
    }),
    [CHANGE_BUDGET_FAILURE]: (state, {payload: errorResponse}) => ({
      ...state, errorResponse
    }),
    [DELETE_ACCOUNT_SUCCESS]: (state) => ({
      ...state,
      deleted: true,
      errorResponse: null
    }),
    [DELETE_ACCOUNT_FAILURE]: (state, {payload: errorResponse}) => ({
      ...state, errorResponse
    })
  }, initialState
);

export default accountant;

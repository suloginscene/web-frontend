import createRequestSaga, {createRequestActionTypes} from "../lib/api/createRequestSaga";
import {createAction, handleActions} from "redux-actions";
import * as accountantApi from "../lib/api/accountant";
import {takeLatest} from "redux-saga/effects";
import produce from "immer";

const [ACCOUNTANT_INDEX, ACCOUNTANT_INDEX_SUCCESS, ACCOUNTANT_INDEX_FAILURE] = createRequestActionTypes("accountant/ACCOUNTANT_INDEX");

export const accountantIndex = createAction(ACCOUNTANT_INDEX, (indexLink) => ({indexLink}));

const accountantIndexSaga = createRequestSaga(ACCOUNTANT_INDEX, accountantApi.index);

export function* accountantSaga() {
  yield takeLatest(ACCOUNTANT_INDEX, accountantIndexSaga);
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
  errorResponse: null
}

const accountant = handleActions({
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
  }, initialState
);

export default accountant;

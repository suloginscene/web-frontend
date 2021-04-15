import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import member, {memberSaga} from './member';
import accountant, {accountantSaga} from './accountant';
import loading from './loading';

const rootReducer = combineReducers({
  member, accountant, loading
});

export function* rootSaga() {
  yield all([memberSaga(), accountantSaga()]);
}

export default rootReducer;

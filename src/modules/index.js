import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import member, {memberSaga} from './member';
import loading from './loading';

const rootReducer = combineReducers({
  member, loading
});

export function* rootSaga() {
  yield all([memberSaga()]);
}

export default rootReducer;

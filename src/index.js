import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import createSagaMiddleware from 'redux-saga';
import rootReducer, {rootSaga} from "./modules";
import {memberIndex, setRefreshToken} from "./modules/member";
import {accountantIndex} from "./modules/accountant";
import {accountantServer, memberServer} from './properties';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

const loadIndex = () => {
  store.dispatch(memberIndex(memberServer + '/api'));
  store.dispatch(accountantIndex(accountantServer + '/api'));
};

const loadRefreshToken = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (refreshToken) store.dispatch(setRefreshToken(refreshToken));
};

sagaMiddleware.run(rootSaga);
loadIndex();
loadRefreshToken();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import createSagaMiddleware from 'redux-saga';
import rootReducer, {rootSaga} from "./modules";
import {memberIndex, setJwt} from "./modules/member";
import {accountantIndex} from "./modules/accountant";
import {accountantServer, memberServer} from './properties';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

const loadIndex = () => {
  store.dispatch(memberIndex(memberServer + '/api'));
  store.dispatch(accountantIndex(accountantServer + '/api'));
};
const loadUser = () => {
  const jwt = localStorage.getItem('jwt');
  if (jwt) store.dispatch(setJwt(jwt));
};

sagaMiddleware.run(rootSaga);
loadIndex();
loadUser();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

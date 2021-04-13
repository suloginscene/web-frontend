import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import createSagaMiddleware from 'redux-saga';
import rootReducer, {rootSaga} from "./modules";
import {authIndex, setJwt} from "./modules/auth";
import {authServer, profile, testJwt} from './properties';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

const loadIndex = () => {
  store.dispatch(authIndex(authServer + '/api'));
};
const loadUser = () => {
  if (profile === 'test') store.dispatch(setJwt(testJwt));
  else if (localStorage.getItem('jwt')) store.dispatch(setJwt(localStorage.getItem('jwt')));
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

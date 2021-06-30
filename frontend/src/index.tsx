import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../src/constants/colors.scss';
import '../src/constants/fonts.scss';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { AccountReducer } from './pages/account/account.reducer';
import { LoginReducer } from './pages/login/login.reducer';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root.saga';

const sagaMiddleware = createSagaMiddleware();

const allReducers = combineReducers({
  login: LoginReducer,
  account: AccountReducer
});

const store = createStore(allReducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

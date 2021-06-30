import { saveLogin } from './login.actions';
import { UserCredentialsDTO } from './../../dto/user-credentials';
import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';
import { ACTIONS } from './login.types';

function postLoginFormInfo(userCredentials: UserCredentialsDTO) {
  const response = axios
    .post(`http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_PORT}/login`, userCredentials)
    .then(data => {
      localStorage.setItem('current_user', JSON.stringify({ token: data.data }));
      return data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return response;
}

export function* loginSaga(): any {
  yield takeEvery(ACTIONS.LOGIN_ATTEMPT, login);
}

export function* login(userCredentials: any): any {
  console.log('sadfasdfasdfasdf');
  console.log('user credentials:', userCredentials);
  const response = yield call(postLoginFormInfo, userCredentials.payload);
  console.log(response);
  if (response.status === 200) {
    yield put(saveLogin(response.data));
  }
}

import { UserDetailsDTO } from './../../dto/user-details';
import { loadUserData } from './account.actions';
import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { ACTIONS } from './account.types';

function getAccountData(token: string) {
  const response = axios
    .post(`http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_PORT}/userDetails`, { token: token })
    .then(data => {
      return data.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return response;
}

function updateAccountData(newUserDetails: any) {
  const response = axios
    .post(`http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_PORT}/newUserDetails`, { token: newUserDetails.token, ...newUserDetails })
    .then(data => {
      return data.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return response;
}

export function* getUserDataSaga(): any {
  yield takeEvery(ACTIONS.GET_USER_DATA, getUserData);
}

export function* getUserData(token: any): any {
  const UserDetailsDTO: UserDetailsDTO = yield call(getAccountData, token.payload);
  yield put(loadUserData(UserDetailsDTO));
}

export function* updateUserDataSaga(): any {
  yield takeEvery(ACTIONS.UPDATE_USER_DATA, updateUserData);
}

export function* updateUserData(newUserDetails: any): any {
  const UserDetailsDTO: UserDetailsDTO = yield call(updateAccountData, newUserDetails.payload);
  yield put(loadUserData(UserDetailsDTO));
}

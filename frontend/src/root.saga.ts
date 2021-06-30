import { all, fork } from "redux-saga/effects";
import { getUserDataSaga, updateUserDataSaga } from "./pages/account/account.saga";
import { loginSaga } from "./pages/login/login.saga";

export default function* rootSaga() {
  yield all([fork(loginSaga), fork(getUserDataSaga), fork(updateUserDataSaga)]);
}
import { put, takeEvery } from 'redux-saga/effects';
import {
  USER_LOGIN,
  USER_LOGIN_REQUEST,
  USER_LOGIN_COMPLETED,
  USER_LOGIN_ERROR,
  USER_REGISTER,
  USER_REGISTER_REQUEST,
  USER_REGISTER_COMPLETED,
  USER_REGISTER_ERROR,
} from './actions';
import { Login as loginApi, Register as registerApi } from '../api/auth';

function* loginSaga({ payload }) {
  try {
    yield put({ type: USER_LOGIN_REQUEST });
    const data = yield loginApi(payload);
    yield put({ type: USER_LOGIN_COMPLETED, payload: data });
  } catch (error) {
    yield put({
      type: USER_LOGIN_ERROR,
      payload: error?.message || 'Login failed',
    });
  }
}

function* registerSaga({ payload }) {
  try {
    yield put({ type: USER_REGISTER_REQUEST });
    const data = yield registerApi(payload);
    yield put({ type: USER_REGISTER_COMPLETED, payload: data });
  } catch (error) {
    yield put({
      type: USER_REGISTER_ERROR,
      payload: error?.message || 'Register failed',
    });
  }
}

export default function* authSaga() {
  yield takeEvery(USER_LOGIN, loginSaga);
  yield takeEvery(USER_REGISTER, registerSaga);
}

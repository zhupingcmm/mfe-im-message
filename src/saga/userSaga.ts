// store/sagas.ts
import { takeEvery, call, put } from 'redux-saga/effects';
import { LOGIN_REQUEST, loginSuccess, loginFailure } from '../action/userAction';
import axios from 'axios';
import { ApiResponse, LoginPack } from '../types';

function* loginSaga(action: any): any {
  try {
    // 在这里执行用户登录逻辑，这里简单地模拟一个异步操作
    const user = yield call(login, action.payload);
    yield put(loginSuccess(user));
  } catch (error) {
    if (error instanceof Error) {
        yield put(loginFailure(error.message));
    }
  }
}

// 模拟用户登录的异步操作const fakeLogin = async (username: string, password: string): Promise<UserData> => {
const login = async (userInfo: LoginPack): Promise<ApiResponse<LoginPack>> => {
    try {
        const response = await axios.post('http://localhost:9001/v1/auth/login', { ...userInfo });
        return response.data as ApiResponse<LoginPack>;
    } catch (error) {
        throw new Error('Invalid username or password');
    }
};
export default function* userSaga() {
  yield takeEvery(LOGIN_REQUEST, loginSaga);
}

// sagas/index.ts
import { all } from 'redux-saga/effects';
import userSaga from './userSaga';

function* rootSaga() {
  yield all([
     userSaga()
    // 在这里添加其他的 sagas
  ]);
}

export default rootSaga;

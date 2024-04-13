// store/reducers.ts
import { combineReducers } from 'redux';
import { userReducer } from './userReducer';

// 定义根状态类型
export interface RootState {
//   user: UserState;
}


// 合并各个 reducer
const rootReducer = combineReducers<RootState>({
  user: userReducer,
});

export default rootReducer;

import { signup } from './service';

const Model = {
  namespace: 'userRegister',
  state: {
    status: undefined,
  },
  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(signup, payload);
      console.log(response)
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
  },
  reducers: {
    registerHandle(state, { payload }) {
      console.log(payload,111111)
      return { ...state, status: payload.status };
    },
  },
};
export default Model;

import { queryCurrent, queryFakeList, queryTest } from './service';

const Model = {
  namespace: 'accountCenter',
  state: {
    currentUser: {},
    list: [],
  },
  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      const test = yield call(queryTest);
      yield put({
        type: 'saveCurrentUser',
        payload: response.data,
      });
    },

    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    queryList(state, action) {
      return { ...state, list: action.payload };
    },
  },
};
export default Model;

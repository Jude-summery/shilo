import { queryCurrent, queryPosts, userUpdate } from './service';

const Model = {
  namespace: 'accountCenter',
  state: {
    currentUser: {},
    list: []
  },
  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response.data,
      });
    },

    *fetchPosts({ payload }, { call, put }) {
      const response = yield call(queryPosts, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },

    *updateUser({ payload }, { call, put, select }) {
      const currentUser = (yield select())['accountCenter']
      const response = yield call(userUpdate, payload);
      if(response.state === 200){
        yield put({
          type: saveCurrentUser,
          payload: {
            ...currentUser,
            payload
          }
        })
      }
    }
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    queryList(state, action) {
      return { ...state, list: action.payload };
    }
  },
};
export default Model;

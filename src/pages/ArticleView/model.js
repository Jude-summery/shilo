const { getPostById } = require ('./service')
import { notification } from 'antd';

const Model = {
  namespace: 'articleView',
  state: {
    data: {
      post: null,
      comments: []
    }
  },
  reducers: {
    changeData(state, action){
      return { ...state, data: action.payload };
    }
  },
  effects: {
    *getPost(action, { call, put }){
      const response =  yield call(getPostById, action.payload)
      if(response.status === 200){
        yield put({
          type: 'changePost',
          payload: response.data
        })
      }
    }
  }
}
export default Model;

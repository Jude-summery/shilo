const { getPostById, addComment, deleteComment } = require ('./service')
import { notification } from 'antd';

const Model = {
  namespace: 'articleView',
  state: {
    post: null,
    comments: []
  },
  reducers: {
    changePost(state, action){
      return { ...state, ...action.payload };
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
    },
    *addComment(action, { call, put }){
      const response =  yield call(addComment, action.payload)
      if(response.status === 200){
        notification.success({
          message: '评论成功'
        })
        yield put({
          type: 'changePost',
          payload: {
            comments: response.data
          }
        })
      }
    },
    *deleteComment(action, { call, put }){
      const response =  yield call(deleteComment, action.payload)
      if(response.status === 200 && response.statusText == 'success'){
        notification.success({
          message: '评论删除成功'
        })
        yield put({
          type: 'changePost',
          payload: {
            comments: response.data
          }
        })
      } else {
        notification.error({
          message: response.message
        })
      }
    },
  }
}
export default Model;

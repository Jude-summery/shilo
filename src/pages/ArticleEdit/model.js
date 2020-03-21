const { postsCreate, getPostById, postUpdate } = require ('./service')
import { notification } from 'antd';

const Model = {
  namespace: 'articleEdit',
  state: {
    post: {},
  },
  reducers: {
    changePost(state, action){
      console.log({ ...state, ...action.payload })
      return { ...state, ...action.payload };
    }
  },
  effects: {
    *submit(action, { call, put }){
      const content = action.payload.content.toRAW()
      const response =  yield call(postsCreate, {...action.payload, content})
      if(response.status === 200){
        notification.success({
          message: '新增成功'
        })
        location.href = '/'
      }
    },
    *update(action, { call, put }){
      const content = action.payload.content.toRAW()
      const response =  yield call(postUpdate, {...action.payload, content})
      if(response.status === 200){
        notification.success({
          message: '更新成功'
        })
        location.href = '/'
      }
    },
    *getPost({ payload, callback}, { call, put }){
      const response =  yield call(getPostById, payload)
      if(response.status === 200){
        if(callback && typeof callback === 'function') {
          callback(response.data)
        }
      }
    },
  }
}
export default Model;

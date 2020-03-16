const { postsCreate } = require ('./service')
import { notification } from 'antd';

const Model = {
  namespace: 'articleEdit',
  state: {
    
  },
  reducers: {

  },
  effects: {
    *submit(action, { call, put }){
      const content = action.payload.content.toRAW()
      const response =  yield call(postsCreate, {...action.payload, content})
      if(response.status === 200){
        notification.success({
          message: '新增成功'
        })
      }
    }
  }
}
export default Model;

const { userUpdate } = require ('./service')
import { notification } from 'antd';

const Model = {
  namespace: 'accountSettings',
  state: {

  },
  reducers: {

  },
  effects: {
    *submit(action, { call, put }){
      const response =  yield call(userUpdate, action.payload)
      if(response.status === 200){
        notification.success({
          message: '修改成功'
        })
      }
    }
  }
}
export default Model;

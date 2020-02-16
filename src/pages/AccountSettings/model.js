const { signupUpdate } = require ('./service')

const Model = {
  namespace: 'accountSettings',
  state: {

  },
  reducers: {

  },
  effects: {
    *submit(action, { call, put }){
      console.log(111)
      const response =  yield call(signupUpdate, action.payload)
    }
  }
}
export default Model;

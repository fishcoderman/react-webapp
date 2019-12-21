import { get, post } from './ajax'

const recordApi ={
  getMsgList: data => get('record/msglist', data),
  getRecord: data => post('record/getRecord', data),
  readMsg: data => post('record/readMsg', data)
}

export default recordApi
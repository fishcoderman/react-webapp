import socket from '../utils/socket'
import userApi  from '../api/user'
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  // RECEIVE_MSG_LIST,
  // RECEIVE_MSG,
  // MSG_READ
} from './action-types'
// 授权成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
// 错误提示信息的同步action
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
// 接收用户的同步action
const receiveUser = (user) => ({type: RECEIVE_USER, data:user})
// 重置用户的同步action
export const resetUser = (msg) => ({type: RESET_USER, data: msg})
// 接收用户列表的同步action
const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList})
// 接收消息列表的同步action
// const receiveMsgList = ({chatMsgs, userid}) => ({type: RECEIVE_MSG_LIST, data:{chatMsgs, userid}})
// 接收一个消息的同步action
// const receiveMsg = (chatMsg, userid) => ({type: RECEIVE_MSG, data: {chatMsg, userid}})
// 读取了某个聊天消息的同步action
// const msgRead = ({count, from, to}) => ({type: MSG_READ, data: {count, from, to}})

// 登录 注册 刷新 的时候初始化连接socket 以验证socket具体身份
async function initConnect(dispatch, userid) {
  socket.emit('setUser', {id: userid})
}


// 发送消息的异步action
export const sendMsg = ({from, to, content}) => {
  return dispatch => {
    // console.log('发送消息', {from, to, content})
    // 发消息
    socket.emit('sendMsg', {from, to, content})
  }
}

// 读取消息的异步action
export const readMsg = (from, to) => {
  return async dispatch => {
    // const response = await reqReadMsg(from)
    // const result = response.data
    // if(result.code===0) {
    //   const count = result.data
    //   // dispatch(msgRead({count, from, to}))
    // }
  }
}

// 注册异步action
export const register = (user) => {
  const {username, password, password2, type} = user
  // 做表单的前台检查, 如果不通过, 返回一个errorMsg的同步action
  if(!username) {
    return errorMsg('请输入用户名!')
  }
  if(!password || !password2){
    return errorMsg('请输入密码!')
  }
  if(password!==password2) {
    return errorMsg('二次密码要一致!')
  }
  // 表单数据合法, 返回一个发ajax请求的异步action函数
  return async dispatch => {
    // 发送注册的异步ajax请求
    const response = await userApi.register({username, password, type})
    if(response.code===200) {// 成功
      initConnect(dispatch, response.data._id)
      // 分发授权成功的同步action
      dispatch(authSuccess(response.data))
    } else { // 失败
      // 分发错误提示信息的同步action
      dispatch(errorMsg(response.msg))
    }
  }
}

// 登陆异步action
export const login = (user) => {
  const {username, password} = user
  // 做表单的前台检查, 如果不通过, 返回一个errorMsg的同步action
  if(!username) {
    return errorMsg('用户名必须指定!')
  } else if(!password) {
    return errorMsg('密码必须指定!')
  }
  return async dispatch => {
    const response = await userApi.login({username, password})
    if(response.code === 200) {// 成功
      initConnect(dispatch, response.data._id)
      // 分发授权成功的同步action
      dispatch(authSuccess(response.data))
    } else { // 失败
      // 分发错误提示信息的同步action
      dispatch(errorMsg(response.msg))
    }
  }
}

// 更新用户异步action
export const updateUser = (user, history) => {
  return async dispatch => {
    const response = await userApi.updateUser(user)
    if(response.code=== 200) { // 更新成功: data
      dispatch(receiveUser(response.data))
      const {type}  = response.data
      history.push(`${type}`)
    } else { // 更新失败: msg
      dispatch(resetUser(response.msg))
    }
  }
}

// 获取用户异步action
export const getUser = () => {
  return async dispatch => {
    // 执行异步ajax请求
    const result = await userApi.getInfo()
    if(result.code === 200) { 
      // console.log('刷新用户数据')
      initConnect(dispatch, result.data._id)
      dispatch(receiveUser(result.data))
    } else { // 失败
      dispatch(resetUser(result.msg))
    }
  }
}

// 获取用户列表的异步action
export const getUserList = (type) => {
  return async dispatch => {
    // 执行异步ajax请求
    const response = await userApi.userList({type})
    // 得到结果后, 分发一个同步action
    if(response.code === 200) {
      dispatch(receiveUserList(response.data))
    }
  }
}

// /*
// 单例对象
// 1. 创建对象之前: 判断对象是否已经存在, 只有不存在才去创建
// 2. 创建对象之后: 保存对象
//  */

// function initIO(dispatch, userid) {
//   // 1. 创建对象之前: 判断对象是否已经存在, 只有不存在才去创建
//   if(!io.socket) {
//     // 连接服务器, 得到与服务器的连接对象
//     io.socket = io('ws://localhost:4000')  // 2. 创建对象之后: 保存对象
//     // 绑定监听, 接收服务器发送的消息
//     io.socket.on('receiveMsg', function (chatMsg) {
//       console.log('客户端接收服务器发送的消息', chatMsg)
//       // 只有当chatMsg是与当前用户相关的消息, 才去分发同步action保存消息
//       // debugger
//       if(userid===chatMsg.from || userid===chatMsg.to) {
//         dispatch(receiveMsg(chatMsg, userid))
//       }
//     })

//   }
// }






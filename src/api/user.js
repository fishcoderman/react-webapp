import { get, post } from './ajax'

const userApi ={
  login: data => post('users/login', data),
  register: data => post('users/register', data),
  updateUser: data => post('users/updateUser', data),
  getInfo: data => get('users/info'),
  userList: data => post('users/userList', data)
}

export default userApi
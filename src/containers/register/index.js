import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './index.less'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Radio,
  Button,
  Toast
} from 'antd-mobile'
import {connect} from 'react-redux'
import Logo from '../../components/logo/logo'
import {register} from '../../redux/actions'

const ListItem = List.Item
class Register extends Component{
  state = {
    username: '',  // 用户名
    password: '',  // 密码
    password2: '',  // 确认密码
    type: 'employ',  // 用户类型名称   dashen/laoban
  }

  // 点击注册调用
  register = () => {
    this.props.register(this.state)
  }

  // 处理输入数据的改变: 更新对应的状态
  handleChange = (name, val) => {
    // 更新状态
    this.setState({
      [name]: val  // 属性名不是name, 而是name变量的值
    })
  }

  toLogin = () => {
    this.props.history.replace('/login')
  }
  
  componentDidUpdate(){
    const {user} = this.props 
    user.msg && Toast.info(user.msg, 1)
  } 

  render(){
    const {type} = this.state
    const {redirectTo} = this.props.user
    if(redirectTo){
      return  <Redirect to={redirectTo}/>
    }
    return (
      <div>
        <NavBar className="login-nav">Sign&nbsp;&nbsp;&nbsp;Up</NavBar>
        <Logo/>
        <WingBlank>
          <List className="login">
            <WingBlank>
              <InputItem placeholder='请输入用户名' onChange={val => {this.handleChange('username', val)}}>姓&nbsp;&nbsp;&nbsp;名:</InputItem>
              <WhiteSpace/>
              <InputItem placeholder='请输入密码' type="password" onChange={val => {this.handleChange('password', val)}}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
              <WhiteSpace/>
              <InputItem placeholder='请输入确认密码' type="password" onChange={val => {this.handleChange('password2', val)}}>确认密码:</InputItem>
              <WhiteSpace/>
              <ListItem>
                <span className="login-user-type">用户类型:</span>
                <Radio className="login-user-radio" checked={type==='employ'} onChange={() => this.handleChange('type', 'employ')}>大神</Radio>
                <Radio className="login-user-radio" checked={type==='boss'}  onClick={() => this.handleChange('type', 'boss')}>老板</Radio>
              </ListItem>
              <WhiteSpace/>
              <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
              <WhiteSpace/>
              <Button onClick={this.toLogin}>已有账户</Button>
              <WhiteSpace/>
              <WhiteSpace/>
            </WingBlank>
          </List>
        </WingBlank>
      </div>
    )
  }
}


export default connect(
  state => ({user: state.user}),
  {register}
)(Register)
import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './index.less'
import {NavBar, WingBlank,List,InputItem,WhiteSpace,Toast,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import Logo from '../../components/logo/logo'
import {login} from '../../redux/actions'

class Login extends Component{
  state = {
    username: '',  // 用户名
    password: '',  // 密码
  }

  // 点击登陆
  login = () => {
    this.props.login(this.state)
  }

  // 处理输入数据的改变: 更新对应的状态
  handleChange = (name, val) => {
    // 更新状态
    this.setState({
      [name]: val  // 属性名不是name, 而是name变量的值
    })
  }

  toRegister = () => {
    this.props.history.replace('/register')
  }

  componentDidUpdate(){
    const {user} = this.props 
    user.msg && Toast.info(user.msg, 1, ()=>{
      user.msg = ''
    })
  } 

  render(){
    const {redirectTo} = this.props.user
    if(redirectTo){
      return <Redirect to={redirectTo}/>
    }
    return (
      <div>
        <NavBar className="login-nav">Sign&nbsp;&nbsp;&nbsp;In</NavBar>
        <Logo/>
        <WingBlank>
          <List className="login">
            <WingBlank>
              <InputItem placeholder='请输入用户名' onChange={val => {this.handleChange('username', val)}}>姓&nbsp;&nbsp;&nbsp;名:</InputItem>
              <WhiteSpace/>
              <InputItem placeholder='请输入密码' type="password" onChange={val => {this.handleChange('password', val)}}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
              <WhiteSpace/>
              <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;&nbsp;录</Button>
              <WhiteSpace/>
              <div className="toRegister" onClick={this.toRegister}>未有账户去注册</div>
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
  {login}
)(Login)
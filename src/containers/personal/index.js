/*
用户个人中心路由组件
 */

import React from 'react'
import {Result, List, WhiteSpace, Button, Modal, WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {resetUser} from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief

class Personal extends React.Component {

  logout = () => {
    // alert('-----')
    Modal.alert('退出', '确定退出登陆吗?', [
      {text: '取消'},
      {
        text: '确定',
        onPress: ()=> {

          // 干掉cookie中userid
          Cookies.remove('token')
          // 干掉redux管理user
          this.props.resetUser()
        }
      }
    ])
  }

  editinfo = () => {
    // this.props.history.replace(nav.path)
    const {type}  = this.props.user
    this.props.history.push(`${type}info`)
  }

  render() {
    const {username, info, header, company, job, salary} = this.props.user
    return (
      <div style={{marginBottom:50, marginTop:55}}>
        <WingBlank>
          <Result
            img={<img src={header || require('../../assets/images/default.png')}  onClick={this.editinfo} style={{width: 50}} alt="header"/>}
            title={username}
            message={company}
          />
          <List renderHeader={() => '相关信息'}>
            <Item multipleLine>
              <Brief style={{margin: '15px 0'}}>职位: {job}</Brief>
              <Brief style={{margin: '15px 0'}}>简介: {info}</Brief>
              {salary ? <Brief style={{margin: '10px 0'}}>薪资: {salary}</Brief> : null}
            </Item>
          </List>
          <WhiteSpace/>
          <List style={{margin: '15px 0'}}>
            <Button style={{margin: '10px 0'}} type='warning' onClick={this.logout}>退出登录</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {resetUser}
)(Personal)
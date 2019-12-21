import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUserList,} from '../../redux/actions'
import {WhiteSpace} from 'antd-mobile'
import UserList from '../../components/user-list/user-list'

class Boss extends Component {
  componentDidMount () {
    // 获取获取userList
    this.props.getUserList('employ')
  }
  render () {
    return (
      <div>
        <UserList userList={this.props.userList}/>
        <WhiteSpace size="lg"/>
        <WhiteSpace size="lg"/>
      </div>
    )
  }
}

export default connect(
  state => ({userList: state.userList}),
  {getUserList}
)(Boss)
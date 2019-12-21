/*
显示指定用户列表的UI组件
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {WingBlank, WhiteSpace, Card} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'
const Header = Card.Header
const Body = Card.Body

class UserList extends Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  }
  toChat = (user) => {
    localStorage.setItem('header',user.header)
    this.props.history.push(`/chat/${user._id}/username/${user.username}`)
  }
  render () {
    const {userList} = this.props
    return (
      <WingBlank style={{marginBottom:50, marginTop:50}}>
        <QueueAnim type='scale'>
          {
            userList.map(user => (
              <div key={user._id}>
                <WhiteSpace/>
                <Card onClick={()=>this.toChat(user)}>
                  <Header
                    thumb={user.header || require('../../assets/images/default.png')}
                    thumbStyle={{width: '50px', height: '50px' }}
                    extra={user.username}
                  />
                  <Body>
                  <div style={{margin: '10px 0'}}>职位: {user.job}</div>
                  {user.company ? <div style={{margin: '10px 0'}}>公司: {user.company}</div> : null}
                  {user.salary ? <div style={{margin: '10px 0'}}>月薪: {user.salary}</div> : null}
                  <div style={{margin: '10px 0'}}>描述: {user.info}</div>
                  </Body>
                </Card>
              </div>
            ))
          }
        </QueueAnim>
      </WingBlank>
    )
  }
}

export default withRouter(UserList)
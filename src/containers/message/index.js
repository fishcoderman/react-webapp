import React, {Component} from 'react'
import {connect} from 'react-redux'
import socket from '../../utils/socket'
import {List, Badge} from 'antd-mobile'
import recordApi  from '../../api/record'
const Item = List.Item
const Brief = Item.Brief

class Message extends Component {

  state = {
    msgLists: []
  }

  componentDidMount() {
    // 获取消息列表
    this.getMsgList()

    // 绑定监听, 接收服务器发送的消息
    socket.on('receiveMsg',  (chatMsg) => {
      // console.log('客户端接收消息', chatMsg)
      // 获取消息列表
      this.getMsgList()
    })
   
  }

  // 获取消息列表
  async getMsgList(){
    const userid = this.props.user._id
    let result = await recordApi.getMsgList()
    const {chatMsgs, usersList} = result.data
    let msgLists = []
    usersList.forEach(user => {
      const list = chatMsgs.filter(msg => ((msg.to === user._id && msg.from === userid) || (msg.from === user._id && msg.to === userid)))
      msgLists.push({
        user,
        list,
        lastMsg: list[list.length - 1],
        unReadCount: list.filter(user => (!user.read && user.to === userid)).length
      })
    })
    this.setState({msgLists})

  }
  goChatPage(msg){
    localStorage.setItem('header', msg.user.header)
    this.props.history.push(`/chat/${msg.user._id}/username/${msg.user.username}`)
  }

  render(){
    const {msgLists} = this.state
    return(
      <List style={{marginTop:50, marginBottom: 50}}>
      {
        msgLists.map((msg, index) =>{
          return (
            <Item
              key={index}
              extra={<Badge text={msg.unReadCount}/>}
              thumb={msg.user.header}
              arrow='horizontal'
              onClick={() => this.goChatPage(msg)}
            >
              {msg.lastMsg.content}
              <Brief>{msg.user.username}</Brief>
            </Item>
          )
        })
      }
      </List>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {}
)(Message)
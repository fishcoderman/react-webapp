/*
对话聊天的路由组件
 */
import React, {Component} from 'react'
import {NavBar, List, Icon, InputItem, Grid,} from 'antd-mobile';
import {connect} from 'react-redux'
import socket from '../../utils/socket'
import {sendMsg, readMsg} from '../../redux/actions'
import QueueAnim from 'rc-queue-anim'
import recordApi  from '../../api/record'

const Item = List.Item

class Chat extends Component {
  constructor(props){
    super(props)
    // 初始化表情列表数据 
    this.emojis = [
      '😀', '😁', '🤣','😃', '😁',  '😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','😍','🤩','😘','😗','😚','😙', '😋','😛','😜','🤪', '😝',
      '🤑','🤗','🤭','🤫','🤔', '🤐','🤨','😐','😑','😶','😏','😒','🙄','😬','🤥','😌','😔','😪','🤤','😴','😷','🤒','🤕','🤢','🤮','🤧'
    ]
  }

  state = {
    chatMsgs: [],
    content: '',
    isShow: false // 是否显示表情列表
  }

  componentWillMount(){
    this.getMsgList().then(chatMsgs=>{
      this.setState({
        chatMsgs,
      })
    })
  }

  // 获取聊天记录
  async getMsgList() {
    const from = this.props.user._id
    const to = this.props.match.params.userid
    const result = await recordApi.getRecord({from, to})
    return result.code === 200 ?  result.data.chatMsgs : []
  }

  componentDidMount() {
    // 绑定监听, 接收服务器发送的消息
    socket.on('receiveMsg',  (chatMsg) => {
      // console.log('客户端接收消息', chatMsg)
      let chatMsgs = this.state.chatMsgs
      chatMsgs.push(chatMsg)
      this.setState({
        chatMsgs
      })
    })

    // 初始显示列表
    setTimeout(()=>{
      window.scrollTo(0,  document.body.scrollHeight + 100)
    }, 2000)

    // 更新消息已读
    this.readMsg()
   
  }

  async readMsg() {
    // 更新未读消息
    const from = this.props.match.params.userid
    const to = this.props.user._id
    recordApi.readMsg({from, to})
  }

  componentWillUnmount () { 
    // 在退出之前 发请求更新消息的未读状态
    this.readMsg()
  }

  componentDidUpdate () {
    // 更新显示列表
    setTimeout(()=>{
      window.scrollTo(0,  document.body.scrollHeight + 100)
    }, 2000)
  }



  toggleShow = () => {
    const isShow = !this.state.isShow
    this.setState({isShow})
    if(isShow) {
      // 异步手动派发resize事件,解决表情列表显示的bug
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0)
    }
  }

  handleSend = () => {
    // 收集数据
    const from = this.props.user._id
    const to = this.props.match.params.userid
    const content = this.state.content.trim()
    // 发送请求(发消息)
    if(content) {
      this.props.sendMsg({from, to, content})
    }
    // 清除输入数据
    this.setState({
      content: '',
      isShow: false
    })
  }

  render() {
    const targetId = this.props.match.params.userid
    const username = this.props.match.params.username
    const {user} = this.props
    const {chatMsgs} = this.state 
    const heade = localStorage.getItem('header') || require('../../assets/images/default.png')
    // console.log('chatMsgs', chatMsgs)
    return (
      <div id='chat-page'>
        <NavBar
          icon={<Icon type='left'/>}
          className='sticky-header'
          onLeftClick={()=> this.props.history.goBack()}
        >
          {username}
        </NavBar>
        <List style={{marginTop:46, marginBottom: 100, background: 'white'}}>
          <QueueAnim type='left' delay={100}>
            {
              chatMsgs.map(msg => {
                if(targetId===msg.from) {// 对方发给我的
                  return (
                    <Item key={msg._id} thumb={heade}>
                      {msg.content}
                    </Item>
                  )
                } else { // 我发给对方的
                  return (
                    <Item key={msg._id} className='chat-me' extra={<img alt="#" src={user.header} />}  > 
                      {msg.content}
                    </Item>
                  )
                }
              })
            }
          </QueueAnim>
        </List>
        <div className='am-tab-bar'>
          <InputItem
            placeholder="请输入"
            value={this.state.content}
            onChange={val => this.setState({content: val})}
            onFocus={() => this.setState({isShow: false})}
            extra={
              <div style={{height:'30px'}}>
                <span style={{marginRight:5,fontSize: '20px', color: '#000'}} onClick={this.toggleShow}> + </span>
                <span style={{marginRight:5,fontSize: '16px', color: '#000'}} onClick={this.handleSend}>发送</span>
              </div>
            }
          />
          {this.state.isShow ? (
            <Grid
              data={this.emojis}
              renderItem={emoji => (
                <div style={{fontSize: '20px', marginTop: 15}}>{emoji}</div>
              )}
              columnNum={7}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={(item) => {
                this.setState({content: this.state.content + item})
              }}
            />
          ) : null}
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {sendMsg, readMsg}
)(Chat)
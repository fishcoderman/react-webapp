import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import BossInfo from '../boss/info'
import EmployInfo from '../employ/info'
import Boss from '../boss/index'
import Employ from '../employ/index'
import Message from '../message/index'
import Personal from '../personal/index'
import Error from '../error/index'
import Cookies from 'js-cookie'  // 可以操作前端cookie的对象 set()/get()/remove()
import {getUser} from '../../redux/actions'
import {getRedirectTo} from '../../utils'
import NavFooter from '../../components/nav-footer/nav-footer'
import {NavBar} from 'antd-mobile'
import Chat from '../chat/chat'
class Main extends Component{
    // 给组件对象添加属性
  navList = [ // 包含所有导航组件的相关信息数据
    {
      path: '/boss', // 路由路径
      component: Boss,
      title: 'Employ List',
      icon: 'dashen',
      text: '求职'
    },
    {
      path: '/employ', // 路由路径
      component: Employ,
      title: 'Boss List',
      icon: 'laoban',
      text: '老板'
    },
    {
      path: '/message', // 路由路径
      component: Message,
      title: 'Message List',
      icon: 'message',
      text: '消息'
    },
    {
      path: '/personal', // 路由路径
      component: Personal,
      title: 'Personal List',
      icon: 'personal',
      text: '个人'
    }
  ]
  componentDidMount () {
    //登陆过(cookie中有userid), 但没有有登陆(redux管理的user中没有_id) 发请求获取对应的user
    const userid = Cookies.get('token')
    const {_id} = this.props.user
    if(userid && !_id) {
      // 发送异步请求, 获取user
      // console.log('发送ajax请求获取user')
      this.props.getUser()
    }
  }
  render(){
    // 读取cookie中的userid
    const userid = Cookies.get('token')
    // 如果没有, 自动重定向到登陆界面
    if(!userid) {
    return <Redirect to='/login'/>
    }
    // 如果有,读取redux中的user状态
    const {user} = this.props
    // 如果user有没有_id, 返回null(不做任何显示)
    if(!user._id) {
      return null // 去请求后台user具体信息
    } else {
      // 如果有_id, 显示对应的界面
      // 如果请求根路径, 根据user的type和header来计算出一个重定向的路由路径, 并自动重定向
      let path = this.props.location.pathname
      if(path === '/') {
        // 得到一个重定向的路由路径
        path = getRedirectTo(user.type, user.header)
        return <Redirect to= {path}/>
      }
    }

    // 获取列表
    const {navList} = this
    const path = this.props.location.pathname // 请求的路径
    const currentNav = navList.find(nav=> nav.path===path) // 得到当前的nav, 可能没有

    if(currentNav) {
      // 决定哪个路由需要隐藏
      if(user.type==='boss') {
        // 隐藏数组的第2个
        navList[1].hide = true
        navList[0].hide = false
      } else {
        // 隐藏数组的第1个
        navList[0].hide = true
        navList[1].hide = false
      }
    }

    // 过滤掉hide为true的nav
    const showNavLists = navList.filter(nav => !nav.hide)

    return (
      <div>
        {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> : null}
        <Switch>
          {
            showNavLists.map(nav => <Route key={nav.path} path={nav.path} component={nav.component}/>)
          }
          <Route path="/bossinfo"   component={BossInfo}/>
          <Route path="/employinfo"  component={EmployInfo}/>
          <Route path='/chat/:userid/username/:username' component={Chat}/>
          <Route path="/" component={Error}></Route> 
        </Switch>
        {currentNav ? <NavFooter navList={showNavLists}/> : null}
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {getUser}
)(Main)

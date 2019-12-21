import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar, InputItem, TextareaItem, Button, WhiteSpace, Card, WingBlank, Icon} from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'
import {updateUser} from '../../redux/actions'
import {dateFormat} from  '../../utils/index'

class DashenInfo extends Component {

  state = {
    header: '',
    job: '',
    info: '',
  }

  // 更新header状态
  setHeader = (header) => {
    this.setState({
      header
    })
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  componentDidMount() {
    Object.keys(this.state).forEach(key=>{
      this.handleChange(key, this.props.user[key])
    })
  }

  save = () => {
    this.props.updateUser(this.state, this.props.history)
  }

  render () {
   
    const {header, type, username, info, job} = this.props.user
    const dateNow = dateFormat(new Date(), 'yyyy-MM-dd');
    return (
      <div style={{background: '#fff'}}>
        <NavBar  
          icon={<Icon type='left'/>}
          onLeftClick={()=> this.props.history.goBack()}>
            求职者信息完善
        </NavBar>
        <Card>
          <Card.Header
            title={<span style={{marginLeft: '8px'}}>{username || 'myName'}</span>}
            thumb={header || this.state.header || require('../../assets/images/default.png')}
            thumbStyle={{width: '50px', height: '50px' }}
            extra={<span>角色： {type || 'boss'}</span>}
          />
          <Card.Body>
          <div>{info || 'Code is cheap, Show you money !'}</div>
          </Card.Body>
          <Card.Footer content="" extra={<div>{dateNow}</div>} />
        </Card>
        <div style={{padding: '10px 10px', background: '#fff', color: '#888'}}>请选择头像：</div>
        <HeaderSelector setHeader={this.setHeader}/>
        <WhiteSpace style={{background: '#fff'}}/>
        <WhiteSpace style={{background: '#fff'}}/>
        <InputItem placeholder='请输入求职岗位' defaultValue={job}  onChange={val => {this.handleChange('job', val)}}>求职岗位:</InputItem>
        <TextareaItem 
          title="个人介绍:" 
          placeholder='请输入个人介绍' 
          defaultValue={info} 
          rows={3} 
          onChange={val => {this.handleChange('info', val)}}
        />
        <WhiteSpace style={{background: '#fff'}}/>
        <WingBlank><Button type='primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button></WingBlank> 
        <WhiteSpace style={{background: '#fff'}}/>
        <WhiteSpace style={{background: '#fff'}}/>
        <WhiteSpace style={{background: '#fff'}}/>
        <WhiteSpace style={{background: '#fff'}}/>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {updateUser}
)(DashenInfo)
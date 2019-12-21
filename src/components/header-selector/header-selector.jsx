/*
选择用户头像的UI组件
 */

import React, {Component} from 'react'
import {List, Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

export default class HeaderSelector extends Component {

  static propTypes = {
    setHeader: PropTypes.func.isRequired
  }

  state = {
    icon: null //图片对象, 默认没有值
  }

  constructor(props) {
    super(props)
    // 准备需要显示的列表数据
    this.headerList = Array.from(new Array(20)).map((item,i)=>(
      {
        text: '头像'+(i+1),
        icon: require(`../../assets/images/头像${i+1}.png`)
      }
    ))
  }

  handleClick = ({text, icon}) => {
    // 更新当前组件状态
    this.setState({icon})
    // 调用函数更新父组件状态
    this.props.setHeader(icon)
  }

  render () {
    return (
      <div>
        <List>
          <Grid data={this.headerList}
            columnNum={4}
            renderItem={dataItem => (
              <div style={{ padding: '5px' }}>
                <img src={dataItem.icon} style={{ width: '50px', height: '50px' }} alt="#" />
                <div style={{ color: '#888', fontSize: '12px', marginTop: '8px' }}>
                  <span>{dataItem.text}</span>
                </div>
              </div>
            )}
            onClick={this.handleClick}/>
        </List>
      </div>
    )
  }
}
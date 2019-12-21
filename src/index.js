import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import store from './redux/store'
import Register from './containers/register'
import Login from './containers/login'
import Main from './containers/main'
import './assets/css/index.less'

// 生命周期 
// componentWillMount 
// render 
// componentDidMount 
// 数据改变触发更新
// componentWillUpdate 
// render
// componentDidUpdate 

ReactDOM.render((
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/register"   component={Register}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/" component={Main}></Route> 
      </Switch>
    </HashRouter>
  </Provider>
), document.getElementById('root'))

registerServiceWorker();

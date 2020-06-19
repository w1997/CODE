import React, { Component } from 'react';
import {Route,Link,Switch,Redirect} from "react-router-dom"
import Home from "./components/Home"
import List from "./components/List"
import User from "./components/User"
import Detail from './components/Detail';
import Error from "./components/404"
class App extends Component{
  render(){
    return(
          <div>
            <h3>App</h3>
            <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/list">列表页</Link></li>
                <li><Link to={{pathname:"/user",search:"?username=admin"}}>用户中心</Link></li>
            </ul>
            {/* 路由规则，每一个Route组件就是一条规则 */}
            <Switch>
            <Redirect from="/cart" to="/list"></Redirect>
            <Route path="/" exact component={Home}></Route>
            <Route path="/" exact component={Home}></Route>
            <Route path="/list" component={List}></Route>
            <Route path="/user" component={User}></Route>
            <Route path="/detail/:id" component={Detail}></Route>
            <Route component={Error}></Route>
            </Switch>
        </div>
    )
  }
}

export default App;

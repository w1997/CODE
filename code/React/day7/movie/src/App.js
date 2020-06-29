import React, { Component } from 'react';
// import { Button } from 'antd';
import 'antd/dist/antd.less'
import {Route,Switch,BrowserRouter} from "react-router-dom"
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
class App extends Component{
  render(){
    return(
      <BrowserRouter>
      <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/" component={Admin}></Route>
          </Switch>
      </BrowserRouter>
        
      
    )
  }
}
export default App;

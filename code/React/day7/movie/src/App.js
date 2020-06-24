import React, { Component } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css'
import {Route,Link,Switch,Redirect} from "react-router-dom"
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
class App extends Component{
  render(){
    return(
      //  <div className="App">
        // <Button type="primary">Button</Button>
      // </div> 
        <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/admin" component={Admin}></Route>
            </Switch>
      
    )
  }
}
export default App;

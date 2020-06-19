import React,{Component} from "react" ;
import { Route, Link } from "react-router-dom";
import Reg from "./Reg";
import Login from "./Login";

export default class User extends Component{
    render(){
        return(
            <div>
                <h3>用户组件</h3>
                <ul>
                    <li><Link to="/user/reg">注册</Link></li>
                    <li><Link to="/user/login">登录</Link></li>
                </ul>
                <Route path="/user/reg" component={Reg}></Route>
                <Route path="/user/login" component={Login}></Route>
            </div>
        )
    }
}
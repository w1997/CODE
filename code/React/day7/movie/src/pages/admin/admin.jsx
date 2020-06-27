import React, { Component } from 'react'
import {Route ,Redirect,Switch} from 'react-router-dom'
import {Layout} from 'antd';
import memorySave from '../../utils/memorySave'
import './admin.css'


import LeftNav from '../../components/left-nav';
import Header from '../../components/header'

import Home from "../home/home"
import Category from "../category/category"
import Product from "../product/product"
import Role from "../role/role"
import User from "../user/user"
import Bar from "../charts/bar"
import Line from "../charts/line"
import Pie from "../charts/pie"

const { Footer, Sider,Content} = Layout;


export default class Admin extends Component{
    render(){
        let user=memorySave.user;
        if(!user || !user._id){
            return <Redirect to="/login"></Redirect>
        }
        return (
                <Layout className="admin" style={{height:"100%"}}>
                    <Sider className="sider"><LeftNav></LeftNav></Sider>
                    <Layout className="section">
                        <Header className="header">
                        </Header>
                        <Content style={{margin: 20, backgroundColor: '#fff'}} className="content">
                            <Switch>
                                <Route exact path="/home" component={Home} ></Route>
                                <Route path="/category" component={Category} ></Route>
                                <Route  path="/product" component={Product} ></Route>
                                <Route  path="/role" component={Role} ></Route>
                                <Route  path="/user" component={User} ></Route>
                                <Route  path="/bar" component={Bar} ></Route>
                                <Route  path="/line" component={Line} ></Route>
                                <Route  path="/pie" component={Pie} ></Route>
                                <Redirect to="/home"></Redirect>
                            </Switch>
                        </Content>
                        <Footer style={{textAlign:"center",color:"#aaa",}}>学习react so easy~</Footer>
                    </Layout>
                </Layout>
            )
    }
    
}
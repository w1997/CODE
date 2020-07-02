import React, { Component } from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import ProductHome from './home'
import Addproduct from './addproduct'
import Detail from './detail'
export default  class Product extends Component{
    render(){
        return(
            <Switch>
                <Route path="/product" exact component={ProductHome} ></Route>
                <Route path="/product/addproduct" component={Addproduct} ></Route>
                <Route path="/product/detailproduct" component={Detail} ></Route>
            </Switch>
        )
    }
}
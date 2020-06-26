import React from 'react'
import { Component } from 'react'; 
import './index.css'
import LinkButton from '../link-button/index'
export default class Header extends Component{
    render(){
        return(
            <div className="header">
                <div className="header-top">
                    <span>欢迎，admin</span>
                    <LinkButton>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">首页</div>
                    <div className="header-bottom-right">
                        <span>2020-06-26</span>
                        <img src="" alt="weather"/>
                        <span>晴</span>
                    </div>
                </div>

            </div>
        )
    }
}
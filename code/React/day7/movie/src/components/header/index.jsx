import React from 'react'
import { Component } from 'react';
import './index.less'
import LinkButton from '../link-button/index'
import formatDate from '../../utils/dateUtils'
import memorySave from '../../utils/memorySave'
import {reqWeather} from '../../api/index' 
import {withRouter} from 'react-router-dom'
import menuList from '../../config/menuConfig'
import { Modal } from 'antd';
import localstorageSave from '../../utils/localstorageSave'

class Header extends Component {
    state = {
        currentTime: formatDate(Date.now()),    
        dayPictureUrl:"",
        weather:"",
    }
    getTime = () => {
        setInterval(() => {
            const currentTime = formatDate(Date.now())
            this.setState({ currentTime })
        }, 1000)
    }
    getWeather= async()=>{
        const {dayPictureUrl,weather} =await reqWeather("郑州")
        this.setState({
            dayPictureUrl,
            weather
        })
    }
    getTitle=()=>{
        let path=this.props.location.pathname;
        let title=""
        menuList.forEach(item=>{
            if(item.key===path){
                title=item.title;
            }else if(item.children){
                item.children.find(cItem=>{
                    if(cItem.key===path)
                     title=cItem.title
                })
            }
        })
        return title
    }
    logout=()=>{
        Modal.confirm({
            content:'你确定要退出吗',
            onOk:()=>{
                //删除本地信息和内存信息
                memorySave.user=""
                localstorageSave.removeUser();
                this.props.history.replace("/login")
            },
            onCancel(){
            }
        })
    }
    componentDidMount() {
        this.getTime();
        this.getWeather();
    }
    render() {
        const username = memorySave.user.username;
        // console.log(this.state.dayPictureUrl)
        let title=this.getTitle();
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎&nbsp;{username}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{this.state.currentTime}</span>
                        <img src={this.state.dayPictureUrl} alt="weather" />
                        <span>{this.state.weather}</span>
                    </div>
                </div>

            </div>
        )
    }
    //清空定时器
    componentWillUnmount(){
        clearInterval(this.intervalId)
    }
}

export default withRouter(Header)
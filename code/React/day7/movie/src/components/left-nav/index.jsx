import React, { Component } from 'react';
import { Menu } from 'antd';
import './index.less'

import { Link, withRouter } from 'react-router-dom'
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu;

class LeftNav extends Component {
    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if (!item.children) {
                //没有孩子
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu key={item.key} title={item.title}>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }
    componentDidCatch(){
        this.menuList=this.getMenuNodes(menuList)
    }
    render() {
        // 得到请请求的pathname
        let path = this.props.location.pathname
        return (
            <div style={{ width: 200 }}>
                
                <h1 style={{ color: '#fff', fontSize: '24px', height:'80px', backgroundColor: " #002140" }}>商品管理系统</h1>
            
                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark">

                    {this.getMenuNodes(menuList)}

                </Menu>
            </div>
        )
    }

}
export default withRouter(LeftNav)
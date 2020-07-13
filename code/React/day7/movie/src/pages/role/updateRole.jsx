import React, { Component } from "react";
import { Tree, Input, Form } from 'antd'
import  menuList  from '../../config/menuConfig'
const { TreeNode } = Tree;
class UpdateRole extends Component {
    state={
        menus:[],
    }
    // 定义一个方法，拿到修改后的状态
    getMenus=()=>this.state.menus
    // 拿到真实的权限树,并渲染出来
    getTreeNodes = (menuList) => {
      return  menuList.map((item) => {
            if (!item.children) {
                return (
                    <TreeNode title={item.title} key={item.key}>
                    </TreeNode>
                )
            } else {
                return (
                    <TreeNode title={item.title} key={item.key}>
                        {this.getTreeNodes(item.children)}
                    </TreeNode>
                )
            }
        })
    }
    /* getTreeNodes = (menuList) =>{
        return menuList.reduce((pre, item) => {
            pre.push(
              <TreeNode title={item.title} key={item.key}>
                {item.children ? this.getTreeNodes(item.children) : null}
              </TreeNode>
            )
            return pre
          }, [])
      
    } */
    componentWillMount(){
        this.treeNodes = this.getTreeNodes(menuList)
    }
    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };
    // 选中复选框时回调函数
    onCheck = (checkedKeys, info) => {
        // console.log('onCheck', checkedKeys, info);
        // checkedKeys
        // console.log(checkedKeys)
        // 拿到选中的角色权限的key，即是/home,/product,数组
        let menus=checkedKeys.checked
        if(menus.length>1){
            // 截取数组不要第一个元素
            menus=menus.slice(1);
            console.log(menus)
            this.setState({
                menus,
            })
        }
    };
    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8 }
        }
        const name = this.props.roleName;
        return (
            // disabled 禁掉响应，disableCheckbox 禁掉checkbox
            // key 被数中的默认属性所用
            <div>
                <Form.Item label="角色名称" {...formItemLayout}>
                   <Input value={name} disabled/>
                </Form.Item>
                <Tree
                    checkable
                    // 默认展开指定的树节点
                    // defaultExpandedKeys={['0-0-0', '0-0-1']}
                    // 默认选中的树节点
                    // defaultSelectedKeys={['0-0-0', '0-0-1']}
                    // 默认选中复选框的树节点
                    defaultCheckedKeys={["/all"]}
                    CheckedKeys={this.state.menus}
                    // checkable 状态下节点选择完全受控（父子节点选中状态不再关联）
                    checkStrictly={true}
                    // 点击树节点触发
                    onSelect={this.onSelect}
                    // 点击复选框触发
                    onCheck={this.onCheck}
                >
                    <TreeNode title="平台权限" key="/all">
                        {/* <TreeNode title="首页" key="0-0-0">
                        </TreeNode>
                        <TreeNode title="商品" key="0-0-1">
                            <TreeNode title="品类管理" key="0-0-1-0" />
                            <TreeNode title="商品管理" key="0-0-1-1" />
                        </TreeNode>
                        <TreeNode title="用户管理" key="0-0-3">
                        </TreeNode>
                        <TreeNode title="角色管理" key="0-0-4">
                        </TreeNode>
                        <TreeNode title="图形图表" key="0-0-5">
                            <TreeNode title="柱形图" key="0-0-5-0" />
                            <TreeNode title="折线图" key="0-0-5-1" />
                            <TreeNode title="饼图" key="0-0-5-3" />
                        </TreeNode>
                        <TreeNode title="订单管理" key="0-0-6">
                        </TreeNode> */}
                        {this.getTreeNodes(menuList)}
                    </TreeNode>
                </Tree>
            </div>
        )
    }
}
export default UpdateRole


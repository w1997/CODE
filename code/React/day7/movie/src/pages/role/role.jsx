import React, { Component } from 'react';
import { Table, Card, Modal, Button, message } from 'antd';
import AddRole from "./addRole"
import { reqAddRole, reqAllRoles, reqUpdateRole } from '../../api/index'
import UpdateRole from './updateRole'
import formatDate from '../../utils/dateUtils'
export default class Role extends Component {
    constructor(props){
        super(props);
        this.myRef=React.createRef();
    }
    state = {
        // 控制弹框的显示和隐藏
        showStuatus: 0,
        // 所有角色列表
        allRoles: [],
        // 角色名称
        roleName: "",
        // 角色的id
        roleId:"",
    }
    // 点击创建角色，弹出对话框
    ShowaddRole = () => {
        this.setState({
            showStuatus: 1
        })
    }
    // 点击设置角色权限，弹出对话框
    ShowupdateRole = () => {
        this.setState({
            showStuatus: 2
        })
    }
    // 点击弹出对话框上的提交按钮，完成添加角色
    addRole = async () => {
        this.setState({
            showStuatus: 0
        })
        // 拿到输入框中的name值
        const { name } = this.form.getFieldsValue();
        // console.log(name)
        // 调接口,拿数据
        const result = await reqAddRole(name);
        // console.log(result)
        if (result.data.status === 0) {
            // 渲染数据
            this.getAllRoles();
            message.success("添加角色成功")
        } else {
            message.error("添加角色失败")
        }
    }
    // 修改角色的权限,完成角色权限的设置
    updateRole = async() => {
        // 隐藏弹框
        this.setState({
            showStuatus: 0
        })
        // 当子组件为高阶组件时，不能直接传方法
        // 拿到角色权限的选中的列表
        const roleId=this.state.roleId
        let menus=this.myRef.current.getMenus()
        // 设置授权时间
        let auth_time=Date.now();
        // 设置授权人的名字
        let auth_name="admin"
        // 调用接口，更新角色权限
        const result=await reqUpdateRole(roleId,menus,auth_time,auth_name)
        console.log(result)
        if(result.data.status===0){
            this.getAllRoles();
            message.success("更新角色成功")
        }else{
            message.error("更新角色失败")
        }
    }
    // 点击弹出对话框上的取消按钮，取消此次操作
    handleCancel = () => {
        this.setState({
            showStuatus: 0
        })
        message.success("已经取消此次操作")
    }
    // 获取角色列表
    getAllRoles = async () => {
        // 调接口
        const result = await reqAllRoles();
        // console.log(result)
        const allRoles = result.data.data
        // 修改状态
        this.setState({
            allRoles
        })
    }
    componentDidMount() {
        this.getAllRoles()
    }
    render() {
        let { showStuatus, allRoles, roleName } = this.state
        const columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                render: (create_time) => formatDate(create_time)
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                render: (auth_time) => formatDate(auth_time)
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
            },
        ];
        const rowSelection = {
            // 设置是单选还是多选
            type: "radio",
            // selectedRowKeys指定选中项的key数组
            // onchange选中项发生变化时的回调
            onChange: (selectedRowKeys, selectedRows) => {
                // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                // 拿到角色名称
                const roleName = `${selectedRowKeys}`
                const roleId=selectedRows[0]._id
                // 拿到选中的角色名称id
                // console.log(roleId)
                this.setState({
                    roleName,
                    roleId
                })

            },
            // 选择框的默认属性配置
            getCheckboxProps: record => ({
                name: record.name,
            }),
        };
        // 拿到角色名称的值
        let name = roleName || ""
        let title = (
            <span>
                <Button type="primary" onClick={() => this.ShowaddRole()} >创建角色</Button>&nbsp;&nbsp;
                <Button onClick={() => this.ShowupdateRole()} >设置角色权限</Button>
            </span>
        )
        return (
            <Card title={title} >
                <Table bordered
                    // 表格行是否可选择
                    rowSelection={rowSelection}
                    rowKey="name"
                    columns={columns}
                    dataSource={allRoles}
                >
                </Table>
                <Modal
                    title="添加角色"
                    visible={showStuatus === 1}
                    okText="提交"
                    cancelText='取消'
                    onOk={this.addRole}
                    onCancel={this.handleCancel}
                >
                    <AddRole setForm={form => this.form = form}></AddRole>
                </Modal>
                <Modal
                    title="设置角色权限"
                    visible={showStuatus === 2}
                    okText="提交"
                    cancelText='取消'
                    onOk={this.updateRole}
                    onCancel={this.handleCancel}
                    forceRender
                >
                    <UpdateRole ref={this.myRef} roleName={name} ></UpdateRole>
                </Modal>
            </Card>
        )
    }
} 
import React, { Component } from 'react';
import { Card, Table, Modal, Button, message } from 'antd'
import LinkButton from '../../components/link-button'
import AddUser from './adduser'
import UpdateUser from './update'
import { reqAdduser, reqAllusers, reqUpdateuser, reqDeleteuser } from '../../api/index'
const { confirm } = Modal;
export default class User extends Component {
    state = {
        showStuatus: 0,
        // 所有的用户信息
        usersInfo: [],
    }
    // 点击页面上的创建用户
    showAddUser = () => {
        this.setState({
            showStuatus: 1
        })
    }
    // 点击页面上的修改
    showUpdateUser = (userInfo) => {
        // 把选中的用户信息，挂载到当前组件实例的userInfo上
        this.userInfo = userInfo;
        this.setState({
            showStuatus: 2
        })
    }
    // 点击添加弹框上的ok按钮，完成用户添加
    addUser = async () => {
        this.setState({
            showStuatus: 0
        })
        // 获取到input框中的内容
        // console.log(this.form.getFieldsValue()) 
        const { username, password, phone, email, role_id } = this.form.getFieldsValue();
        this.form.resetFields();//清除表单之前的数据
        // 调用接口,传入参数，拿到数据
        const result = await reqAdduser(username, password, phone, email, role_id);
        // 判断如果状态等于0，表示此用户还没有添加，如果是1，则表示已经添加过了
        if (result.data.status === 0) {
            // 拿到用户信息，把拿到的用户信息，是一个对象，添加到用户信息数组中
            const usersInfo = result.data.data;
            // 调用此方法，可以重新渲染用户列表
            this.getAllusers()
            message.success("添加用户成功")
        } else {
            message.error("用户已经存在，请重新添加")
        }

    }
    // 点击修改弹框上的ok按钮，完成修改用户
    updateUser = async () => {
        this.setState({
            showStuatus: 0
        })
        // 把选中的id值赋值给user_id
        let user_id = this.userInfo._id;
        // 拿到输入框中的值
        const { username, phone, email, role_id } = this.form.getFieldsValue();
        this.form.resetFields();//清除表单之前的数据
        // 调用接口，拿到更新后的数据
        const result = await reqUpdateuser(user_id, username, phone, email, role_id)
        // console.log(result)
        if (result.data.status === 0) {
            // 数据更新成功
            // 渲染页面
            this.getAllusers()
            message.success("修改用户成功")
        }
    }
    // 点击删除按钮，完成删除用户操作
    deleteUser =  (userInfo) => {
        // 拿到需要删除用户的id
        let user_id = userInfo._id; 
        // 当你点击删除的时候，弹出一个对话框，是否确定要删除
        confirm({
            title: '你确定要删除这个用户吗?',
            // okText是改变对话框上面按钮的文字
            okText:"确定",
            cancelText:"取消",
            // 点击确定，完成删除用户的操作
            onOk :async()=> {
                // 调接口，删除数据
                const result = await reqDeleteuser(user_id);
                if (result.data.status === 0) {
                    this.getAllusers()
                    message.success("删除成功")
                }
            },
            onCancel() { },
        })
    }
    // 点击添加和修改弹框上的Cancel按钮
    handleCancel = () => {
        message.error("操作用户失败")
        this.setState({
            showStuatus: 0
        })
    }
    // 得到所有用户列表
    getAllusers = async () => {
        // 调接口，拿数据
        const result = await reqAllusers();
        // console.log(result.data)
        // 判断状态是否是0
        if (result.data.status === 0) {
            // 拿到所有的数据集合数组，赋值给userInfo
            const usersInfo = result.data.data.users;
            // console.log(userInfo) 
            // 改变状态
            this.setState({
                usersInfo
            })
        } else {
            console.log("获取数据失败")
        }

    }
    // 组件挂载完成时触发的函数
    // 就是render数据都已经渲染完成
    componentDidMount() {
        // 调用方法，渲染出所有用户列表信息
        this.getAllusers();
    }
    render() {
        let { usersInfo, showStuatus } = this.state;
        // 获取选中修改的用户当前信息
        let userInfo = this.userInfo || {}
        // console.log(userInfo)
        const columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: '电话',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                key: 'create_time',
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                key: 'role_id',
            },
            {
                title: '操作',
                // 在点击修改的时候，我们需要得到修改用户的id，以及他们的信息
                // 所以我们需要传递一个用户信息的参数
                render: (userInfo) => {
                    return (
                        <span>
                            <LinkButton onClick={() => { this.showUpdateUser(userInfo) }} >修改</LinkButton> &nbsp;
                            <LinkButton onClick={() => { this.deleteUser(userInfo) }}>删除</LinkButton> &nbsp;
                        </span>
                    )
                }
            },
        ];
        let title = (
            <span>
                <Button type="primary" onClick={() => this.showAddUser()}>创建用户</Button>
            </span>
        )
        return (
            <Card title={title} >
                <Table bordered
                    dataSource={usersInfo}
                    columns={columns}
                ></Table>
                <Modal
                    title="添加分类"
                    visible={showStuatus === 1}
                    onOk={this.addUser}
                    onCancel={this.handleCancel}
                >
                    <AddUser setForm={form => this.form = form}></AddUser>
                </Modal>
                <Modal
                    title="修改分类"
                    visible={showStuatus === 2}
                    onOk={this.updateUser}
                    onCancel={this.handleCancel}
                // forceRender
                >
                    <UpdateUser userInfo={userInfo} setForm={form => this.form = form}></UpdateUser>
                </Modal>
            </Card>
        )
    }
} 

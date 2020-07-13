import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Form, Input, Select } from 'antd'
import { reqAllRoles } from '../../api/index'
const { Option } = Select;
class UpdateUser extends Component {
    state={
        namesList:[]
    }
    componentWillMount() {
        // 将form对象通过setForm()传递父组件
        this.props.setForm(this.props.form)
    }
    // 拿到角色名称数组
    getNames =async () => {
        // 拿到角色名称，调用角色列表接口
        const result=await reqAllRoles();
        // console.log(result)
        if(result.data.status===0&&result.data.data){
            let data=result.data.data
            this.setState({
                namesList:data
            })
        }
    }
    handleChange = (value) => {
        console.log(`selected ${value}`);
    }
    componentDidMount(){
        this.getNames()
    }
    render() {
        let {namesList}=this.state
        const { getFieldDecorator } = this.props.form
        const {username,phone,email,role_id}=this.props.userInfo
        // console.log(this.props)
        const formItemLayout = {
            labelCol: {span:2},
            wrapperCol: {span:8},
          };
        return (
            <Form {...formItemLayout}>
                <Form.Item label="用户名">
                    {getFieldDecorator('username', {
                        initialValue: username,
                        // initialValue:"用户名",
                        rules: [
                            {
                                required: true,
                                message: '请输入正确的用户名'
                            }]
                    })(
                        <Input placeholder="请输入用户名" />
                    )}
                </Form.Item>
                <Form.Item label="手机号">
                    {getFieldDecorator('phone', {
                        initialValue: phone,
                        // initialValue: "手机号",
                    })(<Input placeholder="请输入手机号" />)
                    }
                </Form.Item>
                <Form.Item label="邮箱号">
                    {getFieldDecorator('email', {
                        initialValue: email,
                        // initialValue: "邮箱号",
                        rules: [
                            {
                                type: 'email',
                                message: '请输入格式正确的邮箱号'
                            }]
                    })(<Input placeholder="请输入邮箱号" />)
                    }
                </Form.Item>
                <Form.Item label="角色">
                    {getFieldDecorator('role_id', {
                        initialValue: role_id
                    })(
                        <Select onChange={this.handleChange}>
                            {
                                namesList.map((item)=>{
                                    return (<Option key={item._id} value={item._id}>{item.name}</Option>)
                                })
                            }
                        </Select>)
                    }
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(UpdateUser)
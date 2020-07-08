import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Form, Input } from 'antd'


class UpdateUser extends Component {
    componentWillMount() {
        // 将form对象通过setForm()传递父组件
        this.props.setForm(this.props.form)
    }
    render() {
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
                        initialValue: role_id,
                        // initialValue: "角色",
                    })(<Input placeholder="请输入角色" />)
                    }
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(UpdateUser)
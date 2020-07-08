import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Form, Select, Input } from 'antd'

const { Option } = Select;
class AddUser extends Component {
    componentWillMount() {
        // 将form对象通过setForm()传递父组件
        this.props.setForm(this.props.form)
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {span:2},
            wrapperCol: {span:8},
          };
        return (
            <Form {...formItemLayout}>
                <Form.Item label="用户名">
                    {getFieldDecorator('username', {
                        initialValue: "",
                        rules: [
                            {
                                required: true,
                                message: '请输入正确的用户名'
                            }]
                    })(
                        <Input placeholder="请输入用户名" />
                    )}
                </Form.Item>
                <Form.Item label="密码">
                    {getFieldDecorator('password', {
                        initialValue: '',
                        rules: [
                            {
                                required: true,
                                message: '请输入正确的密码'
                            }]
                    })(<Input placeholder="请输入密码" />)
                    }
                </Form.Item>
                <Form.Item label="手机号">
                    {getFieldDecorator('phone', {
                        initialValue: "",
                    })(<Input placeholder="请输入手机号" />)
                    }
                </Form.Item>
                <Form.Item label="邮箱号">
                    {getFieldDecorator('email', {
                        initialValue: "",
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
                        initialValue: ''
                    })(<Input placeholder="请输入角色" />)
                    }
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(AddUser)
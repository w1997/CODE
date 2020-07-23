import React, { Component } from 'react'
import { Form, Input, Button, message, Icon } from 'antd';

import './login.less'
import { resLogin } from '../../api/index';
// import {Redirect} from 'react-router-dom'
import memorySave from '../../utils/memorySave'
import localstorageSave from '../../utils/localstorageSave'
 class Login extends Component {
    handleSubmit = (event) => {
        // 阻止事件的默认行为
        event.preventDefault()
        // 对所有表单字段进行检验
    this.props.form.validateFields(async (err, values) => {
        // 检验成功
        if (!err) {
          // console.log('提交登陆的ajax请求', values)
          const {username, password} = values
          const result = await resLogin(username, password)
          // console.log('login()', result)
          if(result.data.status === 0) {
            // 提示登录成功
            message.success('登录成功', 2)
            // 保存用户登录信息
            memorySave.user = result.data.data
            localstorageSave.saveUser(result.data.data)
            // 跳转到主页面
            this.props.history.replace('/')
  
          } else {
            // 登录失败, 提示错误
            message.error(result.msg)
          }
        } else {
          console.log('检验失败!')
        }
      });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <header>
                    <h1>商品管理系统</h1>
                </header>
                <section>
                    <h1>用户登录</h1>
                    {/* 引入的antDesign组件 */}
                    <Form
                        className="login-form"
                        onSubmit={this.handleSubmit}
                    >
                        <Form.Item >
                            {
                                getFieldDecorator('username', { // 配置对象: 属性名是特定的一些名称
                                    // 声明式验证: 直接使用别人定义好的验证规则进行验证
                                    rules: [
                                        { required: true, whitespace: true, message: '用户名必须输入' },
                                        { min: 4, message: '用户名至少4位' },
                                        { max: 12, message: '用户名最多12位' },
                                        { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                                    ],
                                    initialValue: 'admin' //指定初始值
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户名"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item >
                            {
                                getFieldDecorator('password', {
                                    rules: [
                                        {
                                            type: "string",
                                            max: 10,
                                            min: 4,
                                            required: true,
                                            message: '请输入正确的密码',
                                        }
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="密码"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
export default Form.create()(Login)
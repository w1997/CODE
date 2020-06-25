import React, { Component } from 'react'
import axios from 'axios'
import { Form, Input, Button,} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.css'
export default class Login extends Component {
    onFinish = values => {
        //写ajax请求，拿数据
        let url="https://www.cnblogs.com/tommymarc/p/11991533.html";
        axios.get(url).then((res)=>{

        }).catch((err)=>{
            console.log(err.message)
        })
        console.log('Received values of form: ', values);
    };
    render() {
        return (
            <div className="login">
                <header>
                    <h1>商品管理系统</h1>
                </header>
                <section>
                    <h1>用户登录</h1>
                    {/* 引入的antDesign组件 */}
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    // type:"string",
                                    max:6,
                                    min:4,
                                    //正则表达式，验证用户名是有数字字母和下划线组成
                                    pattern:/^[0-9a-zA-Z_]{1,}$/,
                                    required: true,
                                    message: '请输入正确的用户名由数字、字母和下划线组成',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    type:"string",
                                    max:10,
                                    min:4,
                                    required: true,
                                    message: '请输入正确的密码',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
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

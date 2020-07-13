import React, { Component } from "react";
import { Form ,Input} from 'antd'
 class AddRole extends Component {
    componentWillMount() {
        // 将form对象通过setForm()传递父组件
        this.props.setForm(this.props.form)
    }
    render() {
        // 如果是报this.props.form属性is undefined，
        // 可能是因为我们没有用Form.create去包装组件
        const { getFieldDecorator } = this.props.form
        const formItemLayout={
            labelCol:{span:4},
            wrapperCol:{span:8}
        }
        // getFieldDecorator 用于和表单进行双向数据绑定
        return (
                <Form {...formItemLayout}>
                    <Form.Item label="角色名称">
                        {getFieldDecorator('name',{
                            rules:[
                                {
                                    type:"string",
                                    required:true,
                                    message:"请输入正确的角色名称"
                                }
                            ]
                        })(<Input placeholder="请输入角色名称"/>)}
                    </Form.Item>
                </Form>
        )
    }
}
// 经过Form.create包装的组件将会自带this.props.form属性
export default Form.create()(AddRole)
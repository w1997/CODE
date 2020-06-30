import React, { Component } from 'react';
import { Button, Card, Icon, Form, Input} from 'antd'

export default class Addproduct extends Component {
    render() {
        const extra = (
            <Button type='primary'>
                添加商品
            </Button>
        )

        return (
            <Card title="添加商品" extra={extra}>
                <Form style={{ margin: "25px 0 0 0" }}>
                    <Form.Item
                        name="productname"
                        rules={[
                            {
                                type:"string",
                                required: true,
                                message: '请输入商品名称',
                            },
                        ]}
                    >
                        <Input size="middle" placeholder="关键字" style={{ width: 200 }} />
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
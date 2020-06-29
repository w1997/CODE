import React, { Component } from 'react';
// import { PlusOutlined } from '@ant-design/icons';
import { Card, Table, Button, Form, Select, Input } from 'antd';
import LinkButton from '../../components/link-button'

const { Option } = Select;
const { Search } = Input;
export default class Product extends Component {
    state = {
        columns: []
    }
    initColums = () => {
        const columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'discription',
                key: 'discription',
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: '状态',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: '操作',
                render: () => {
                    return (
                        <span>
                            <LinkButton >详情</LinkButton> &nbsp;
                            <LinkButton >修改</LinkButton>
                        </span>
                    )
                }
            },
        ];
        this.setState({ columns })
    }
    componentWillMount() {
        this.initColums();
    }
    render() {
        const dataSource = [
            {
                key: '1',
                name: '胡彦斌',
                discription: 32,
                price: '西湖区湖底公园1号',
                price: '西湖区湖底公园1号',
            },

        ];
        const extra = (
            <Button type='primary'>
                添加商品
            </Button>
        )
        const title = (
            <Form style={{margin:"25px 0 0 0"}}>
                <Form.Item>
                    <Select size="middle" placeholder="按名称搜索" style={{ width: 200 }}>
                        <Option value="0">按名称搜索</Option>
                        <Option value="1">家电</Option>
                        <Option value="2">数码</Option>
                    </Select>
                    &nbsp;
                    <Input size="middle" placeholder="关键字" style={{ width: 200 }} />
                    &nbsp;
                    &nbsp;
                    <Button size="middle" type="primary">搜索</Button>
                </Form.Item>
            </Form>
        )
        return (
            <Card title={title} extra={extra}>
                <Table bordered
                    dataSource={dataSource}
                    columns={this.state.columns}
                ></Table>
            </Card>
        )
    }
} 
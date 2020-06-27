import React, { Component } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Table, message } from 'antd'
import LinkButton from '../../components/link-button'
import {reqCategorys,reqUpdateCategory,reqAddCategory} from '../../api/index'
export default class Category extends Component {
    state={
        categorys:[],//一级分类的数据
        columns:[],//表头数据
        loading:false,
    }
    //初始化表头
    initColums=()=>{
        const columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                render: () => {
                    return (
                        <span>
                            <LinkButton>修改分类</LinkButton> &nbsp;
                            <LinkButton>查看子分类</LinkButton> 
                        </span>
                    )
                }
            },
        ];
        this.setState({columns})
    }
    //ajax获取一级列表数据
    getCategorys=async()=>{
        //在发送ajax之前，显示loading
        this.setState({loading:true})
        const result=await reqCategorys("0"); 
        this.setState({loading:false})
        if(result.data.status===0){
            const categorys=result.data.data
            
            this.setState({categorys})
            message.success("获取列表成功")
        }else{
            message.error("获取分类列表失败")
        }
    }
    componentWillMount(){
        this.initColums();
    }
    componentDidMount(){
        this.getCategorys();
    }
    render() {

        const extra = (
            <Button type='primary' onClick={this.showAdd}>
                <PlusOutlined />添加
            </Button>
        ) 
        let title="一级分类列表"
        return (
            <Card title={title} extra={extra}>
                <Table bordered 
                dataSource={this.state.dataSource} 
                columns={this.state.columns} 
                loading={this.state.loading}
                ></Table>
            </Card>
        )
    }
} 
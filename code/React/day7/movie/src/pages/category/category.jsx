import React, { Component } from 'react';
// import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Button, Card, Table, message,Modal ,Icon} from 'antd'
import LinkButton from '../../components/link-button'
import { reqCategorys, reqUpdateCategory, reqAddCategory } from '../../api/index'
import Addcategory from './addCategory'
import Updatecategory from './updateCategory';

export default class Category extends Component {
    state = {
        categorys: [],//一级分类的数据
        subCategorys: [],
        columns: [],//表头数据
        loading: false,
        parentId: "0",
        parentName: "",
        showStuatus:0,
    }
    //初始化表头
    initColums = () => {
        const columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                render: (category) => {
                    return (
                        <span>
                            <LinkButton onClick={()=>{this.showUpdate(category)}}>修改分类</LinkButton> &nbsp;
                            { this.state.parentId === "0" ? <LinkButton onClick={() => { this.showSubCategorys(category) }}>查看子分类</LinkButton> : null}
                        </span>
                    )
                }
            },
        ];
        this.setState({ columns })
    }
    //ajax获取一级列表数据或二级分类列表数据
    getCategorys = async (parentId) => {
        //在发送ajax之前，显示loading
        //  let { parentId } = this.state
        this.setState({ loading: true })
        parentId = parentId || this.state.parentId;
        const result = await reqCategorys(parentId);
        this.setState({ loading: false })
        if (result.data.status === 0) {
            const categorys = result.data.data
            if (parentId === "0") {
                this.setState({ categorys })
            } else {
                this.setState({
                    subCategorys: categorys
                })
            }
        } else {
            message.error("获取分类列表失败")
        }
    }
    //显示二级分类列表的数据
    showSubCategorys = (category) => {
        this.setState({
            parentId: category._id,
            //子分类的名称
            parentName: category.name
        }, () => {
            this.getCategorys()
        })
    }
    //点击一级分类列表，显示一级分类列表
    showCategorys = () => {
        this.setState({
            parentId: "0",
            parentName: "",
            subCategorys: [],
        })
    }
    componentWillMount() {
        this.initColums();
    }
    componentDidMount() {
        this.getCategorys();
    }
    //点击添加按钮
    showAdd=()=>{
        this.setState({
            showStuatus:1
        })
    }
    //点击修改分类
    showUpdate=(category)=>{
        //传递数据 
        this.category=category;
        this.setState({
            showStuatus:2
        })
    }
    //对话框中的添加OK按钮
    addCategory=async()=>{
        this.setState({
            showStuatus:0
        })
        //获取数据
        const{parentId,categoryName}=this.form.getFieldsValue();
        this.form.resetFields();
        //调用接口完成添加
        const result=await reqAddCategory(parentId,categoryName)
        if(result.data.status===0){
            const categorys = result.data.data;
            if(parentId===this.state.parentId){
                this.getCategorys()
            }else if(parentId==='0'){
                this.getCategorys('0')
            }
        }
    }
    //点击对话框中的取消按钮
    handleCancel=()=>{
        alert("取消添加")
        this.setState({
            showStuatus:0
        })
    }
    //对话框中的修改OK按钮
    updateCategory= async()=>{
        //隐藏弹框
        this.setState({
            showStuatus:0
        })
        // 准备数据
        let categoryId=this.category._id;
        let categoryName=this.form.getFieldValue('categoryName')
        this.form.resetFields();//清除表单之前的数据
        // 2.调用更新接口
        let result = await reqUpdateCategory({categoryId, categoryName})
        if(result.data.status===0){
            this.getCategorys()
        }

    }
    render() {
        let { categorys,showStuatus, subCategorys, parentName, parentId, columns } = this.state
    //    读取分类对象
        let category=this.category || {}
        const extra = (
            <Button type='primary' onClick={this.showAdd}>
                <Icon type="plus" /> 添加
            </Button>
        )
        let title = parentId === "0" ? "一级分类列表" : (
            <span>
                <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
                {/* <ArrowRightOutlined /> */}
                <Icon type="arrow-right"  style={{margin:"0 10px"}} /> 
                <span> {parentName}</span>
            </span>
        )
        return (

            <Card title={title} extra={extra}>
                <Table bordered
                // 表格渲染的数据
                    dataSource={parentId === "0" ? categorys : subCategorys}
                    // 表头数据
                    columns={columns}
                    // loading效果
                    loading={this.state.loading}
                ></Table>
                <Modal
                // 点击添加，弹出添加的对话框
                    title="添加分类"
                    // 控制对话框是否显示
                    visible={showStuatus===1} 
                    // 点击对话框上ok按钮，完成添加
                    onOk={this.addCategory}
                    // 点击对话框上的cancle按钮，取消
                    onCancel={this.handleCancel}
                >
                    <Addcategory categorys={categorys} parentId={parentId} setForm={(form)=>{this.form=form}} ></Addcategory>
                </Modal>
                <Modal
                    title="修改分类"
                    visible={showStuatus===2}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                    forceRender
                >
                    <Updatecategory   categoryName={category.name} setForm={form=>this.form=form}></Updatecategory>
                </Modal>
            </Card>
        )
    }
} 
import React, { Component } from 'react';
// import { PlusOutlined } from '@ant-design/icons';
import { Card, Table, Button, Select, Input, Icon } from 'antd';
import LinkButton from '../../components/link-button'
import { reqProducts, reqSearchProducts } from "../../api/index"
import { PAGE_SIZE, } from '../../utils/constants'

const { Option } = Select;
const { Search } = Input;
export default class ProductHome extends Component {
    state = {
        columns: [],
        products: [],
        total: 0,
        loading: false,
        // 关键字
        searchName: "",
        searchType: "productName"

    }
    // 初始化表头数据
    initColums = () => {
        const columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => "￥" + price

            },
            {
                width: 100,
                title: '状态',
                dataIndex: 'status',
                render: (status) => {
                    return (
                        <span>
                            <Button type="primary">下架</Button>
                            <span>在售</span>
                        </span>
                    )
                }
            },
            {
                width: 80,
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
    // 请求第几页的数据，pageNum是第几页，传1得到的就是第一页数据
    getProducts = async (pageNum) => {
        // 发起ajax请求
        this.setState({ loading: true })
        let {searchType,searchName}=this.state;
        let result;
        // 调接口拿到数据
        // 判断如果有关键字，就调用搜索接口，得到的数据就不是全部，如果没有关键字就调用查看商品的接口
        if(searchName){
            result =await reqSearchProducts(pageNum,PAGE_SIZE,searchName,searchType)
        }else{
            result = await reqProducts(pageNum, PAGE_SIZE)
        }
        // 数据拿到后关闭loading
        this.setState({ loading: false })
        // console.log(result)
        if (result.data.status === 0) {
            const { total, list } = result.data.data;
            // 改变状态，更新数据
            this.setState({
                total,
                products: list
            })
        }
    }
    // 把不需要变动的数据，放在即将挂载的钩子函数中
    componentWillMount() {
        this.initColums();
    }
    componentDidMount() {
        this.getProducts(1);
    }
    render() {
        let { products, columns, loading, total, searchType,searchName } = this.state;
        const extra = (
            <Button type='primary'>
                <Icon type="plus"></Icon>
                添加商品
            </Button>
        )
        const title = (
            <span>
                <Select
                // Select中的value参数，指定当前选中的条目
                    value={searchType}
                    style={{ width: 150 }}
                    // 改变select框的内容
                    // onChange()方法，选中的option，或input的value变化是调用这个函数
                    onChange={value => this.setState({ searchType: value })}
                >
                    <Option value="productName">按名称搜索</Option>
                    {/* productDesc的首字母要小写 */}
                    <Option value="productDesc">按描述搜索</Option>
                </Select>
                <Input
                    placeholder="关键字"
                    style={{ width: 150, margin: "0 20px" }} 
                    // Input输入框的value参数是表示输入框内容
                    value={searchName}
                    // onChage(e)方法，输入框内容变化是的回调
                    onChange={event=>this.setState({searchName:event.target.value})}
                />
                <Button type="primary" onClick={()=>{this.getProducts(1)}}>搜索</Button>
            </span>
        )
        return (
            <Card title={title} extra={extra}>
                <Table 
                // 是否展示外边框和列边框
                bordered
                // dataSource表格中的数据源，数据数组
                    dataSource={products}
                    // columns表头的数据，表格列的配置描述，
                    columns={columns}
                    loading={loading}
                    rowKey="_id"
                    // 实现分页
                    pagination={{
                        // total是数据的总数
                        total,
                        // 一页出现的数据最大值
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: this.getProducts,
                    }}
                    // 按照 React 的规范，所有的数组组件必须绑定 key。
                    // 在 Table 中，dataSource 和 columns 里的数据值都需要指定 key 值。
                    // 对于 dataSource 默认将每列数据的 key 属性作为唯一的标识。
                ></Table>
            </Card>
        )
    }
} 
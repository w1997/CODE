import React, { Component } from 'react';
import { Button, Card, Icon, Form, Input, Cascader, message } from 'antd'
import Editor from './editor'
import { reqCategorys, reqAddUpdateProduct } from "../../api/index"
import LinkButton from '../../components/link-button';
import PicturesWall from './pictures-wall'

// 多行输入框
const { TextArea } = Input;
class Addproduct extends Component {
    // 定义一个状态
    state = {
        options: [],
    }
    constructor(props) {
        super(props)
        this.pw = React.createRef()
    }
    //   初始化Options,改变成级联组件的样式
    initOptions = async (categorys) => {
        const options = categorys.map(c => ({
            value: c._id,
            label: c.name,
            isLeaf: false
        }))
        // 从这里开始，就是我们对商品分类中获取二级分类列表进行的操作
        let { isUpdate, product } = this;
        // 从product中解析出pCategoryId, categoryId
        let { pCategoryId, categoryId } = product;
        // 判断是不是修改商品，并且看父id是不是等于0，不等于0代表就是就是一级列表中数据的id值即是家电等的id值
        // 当pCategoryId===0的时候，调用getCategorys()方法拿到就是一级列表的值，即是家电，数码等分类
        if (isUpdate && pCategoryId !== "0") {
            //拿到二级分类列表数据
            const subCategorys = await this.getCategorys(pCategoryId)
            //    把获得二级分类列表每一项改变成我们想要的状态上
            let childOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true,
            }))
            // targetOption就是代表的就是一级列表的数据
            const targetOption = options.find(option => option.value === pCategoryId)
            //    让一级列表中有孩子的数据，进行连接，使一级列表数据（带有孩子的），就能显示出二级列表的数据
            targetOption.children = childOptions
        }
        // console.log(options)
        // 更新options的状态，就是t有孩子的一级列表数据能选择它们的孩子
        this.setState({
            options
        })
    }
    //   级联组件中的方法
    onChange = (value, selectedOptions) => {
        console.log(value, selectedOptions);
    };
    //   动态加载数据,说的是商品分类的那个级联选择的时候
    loadData = async selectedOptions => {
        //   targetOption表示选中的一级分类
        const targetOption = selectedOptions[0];
        targetOption.loading = true;
        // targetOption.value拿到的就是一级分类的_id
        // console.log(targetOption.value)
        // 调用getCategorys方法，传递的参数是一级分类的id，结果就是二级分类列表
        const subCategorys = await this.getCategorys(targetOption.value)
        // console.log(subCategorys)
        // 关闭loading效果
        targetOption.loading = false;
        if (subCategorys && subCategorys.length > 0) {
            // 当前的一级分类有二级分类
            const childrenOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true
            }))
            targetOption.children = childrenOptions
        } else {
            // 当前的一级分类没有二级分类
            targetOption.isLeaf = true
        }
        // 修改状态
        this.setState({ options: [...this.state.options] })

    };
    // 校验输入的价格
    validatorPrice = (rule, value, callback) => {
        if (value * 1 > 0) {
            callback()
        } else {
            callback("价格必须大于0")
        }
    }
    // 获取一级或二级分类的列表
    getCategorys = async (parentId) => {
        // 调用接口，得到一级分类列表
        const result = await reqCategorys(parentId);
        if (result.data.status === 0) {
            const categorys = result.data.data;
            // 如果parentId是0，那么就表示是拿到的就是一级分类列表
            if (parentId === "0") {
                // 调用方法，改变Option的形式
                this.initOptions(categorys)
            } else {
                // 如果不是，返回的就是二级列表的数据
                return categorys
            }
        }
    }
    // 增加或修改点击提交按钮拿到数据
    submit = () => {
        this.props.form.validateFields(async (error, values) => {
            if (!error) {
                // 验证通过
                // console.log(values)
                // 获取子组件传递的方法
                // let Imgs = this.pw.current.getImgs()
                // console.log(Imgs)
                // let detail = this.refs.ed.state.editorContent;
                // console.log(detail);
                const { name, desc, price, categoryIds } = values;
                let pCategoryId, categoryId
                if (categoryIds.length === 1) {
                    // 没有二级分类，pCategoryId="0"
                    pCategoryId = "0"
                    categoryId = categoryIds[0]
                } else {
                    pCategoryId = categoryIds[0];
                    categoryId = categoryIds[1];
                }
                // 接受子组件传递的方法
                let imgs = this.pw.current.getImgs();
                // let fileList=this.pw.current.state.fileList;
                // console.log(fileList)
                // console.log(Imgs)
                let detail = this.refs.ed.state.editorContent;
                const product = { name, desc, price,imgs, detail, pCategoryId, categoryId }
                if (this.isUpdate) {
                    // 给product上加上_id属性
                    product._id = this.product._id
                }
                // 调接口，拿到数据
                let result = await reqAddUpdateProduct(product);
                if (result.data.status === 0) {
                    // 通过isUpdate去判断是更新商品还是添加商品
                    message.success(`${this.isUpdate ? '更新' : '添加'}商品成功！`)
                    // 返回到上一级
                    this.props.history.goBack();
                } else {
                    message.error(`${this.isUpdate ? '更新' : '添加'}商品失败！`)
                }
            }
        })
    }
    componentDidMount() {
        this.getCategorys("0")
    }
    // 接收通过编程式路由传递过来的数据
    componentWillMount() {
        // 接收通过编程式路由传递过来的数据
        // const product=this.props.location.state
        // console.log(product)
        // let的是一个变量
        let product;
        // 由于添加商品中并不需要传递数据，所以添加商品中并没有
        // this.props.location.state，通过判断该值就可以判断是添加还是修改
        if (this.props.location.state) {
            // 把点击修改传递的数据，接收过来
            product = this.props.location.state.product
            // 存在数据，即是修改商品页面
        }
        // ！！，product中有数据，写一个！，表示成了false，写俩个就是true
        this.isUpdate = !!product;
        // 由于添加商品中并没有值，所以给product赋值为一个空对象
        this.product = product || {};
    }
    render() {
        // 从this中解析出isUpdate,product
        let { isUpdate, product } = this
        let { pCategoryId, categoryId, imgs, detail } = product
        // 定义一个空数组，用来放商品分类中的一二级列表的值
        let categoryIds = [];
        // 判断，如果isUpdate是true，就代表着我们要写的就是关于修改商品的数据
        if (isUpdate) {
            // 修改
            // 判断，pCategoryId是否等于零，如果等于零，说明就会显示一级分类列表，没有二级分类列表
            // 只需要在子id也即是一级列表数据显示出来
            if (pCategoryId === "0") {
                // 此商品属于一级分类，没有二级分类
                // 就只会显示像家电，数码等的数据
                // 把一级分类数据push到数组中，就能在商品分类中看到一级分类数据
                categoryIds.push(categoryId)
            } else {
                // 反之我们需要拿到两个id值，一个是一级列表数据的id值，一个是二级数据列表的id值
                // 但是由于我们是先写的这个，所以我们暂时是拿不到二级列表的数据
                // 我们需要在initOptions中去写拿到二级列表中的数据
                categoryIds.push(pCategoryId);
                categoryIds.push(categoryId)
            }
        }
        // 点击箭头返回到上一级
        const title = (
            <span>
                <LinkButton style={{ margin: "0 10px" }}>
                    <Icon type="arrow-left" onClick={() => { this.props.history.go(-1) }} />
                </LinkButton>
                <span>{isUpdate ? "修改商品" : "添加商品"}</span>
            </span>
        )
        // 设置表单中每一项的宽度
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 },
        };
        // 高阶函数
        const { getFieldDecorator } = this.props.form;
        return (
            // card组件是一个卡片组件
            <Card title={title} >
                <Form {...formItemLayout}  >
                    <Form.Item label="商品名称"  >
                        {getFieldDecorator('name', {
                            // 拿到选中的数据，即是修改商品中的默认数据
                            initialValue: product.name,
                            rules: [{
                                required: true,
                                message: "必须要输入商品的名称"
                            }]
                        }
                        )(<Input placeholder="请输入商品名称"></Input>)}
                    </Form.Item>
                    <Form.Item label="商品描述" >
                        {getFieldDecorator('desc', {
                            initialValue: product.desc,
                            rules: [{
                                required: true,
                                message: "必须要输入商品描述"
                            }]
                        }
                        )(<TextArea placeholder="请输入商品描述" autoSize />)}
                    </Form.Item>
                    <Form.Item label="商品价格" >
                        {getFieldDecorator('price', {
                            initialValue: product.price,
                            rules: [{
                                required: true,
                                message: "必须要输入商品价格",
                            }, {
                                validator: this.validatorPrice
                            }]
                        }
                        )(<Input addonAfter={<span>元</span>} placeholder="请输入商品的价格" />)}
                    </Form.Item>
                    <Form.Item label="商品分类" required >
                        {getFieldDecorator('categoryIds', {
                            initialValue: categoryIds,
                            rules: [{
                                required: true,
                                message: "必须要输入商品分类"
                            }]
                        }
                        )(
                            // Cascader组件是一个级联选择的组件，
                            // 在与getFieldDecorator一起用时，默认值必须用initialValue，且值是一个数组
                            <Cascader
                                options={this.state.options}
                                loadData={this.loadData}
                                onChange={this.onChange}
                                changeOnSelect
                            />)}
                    </Form.Item>
                    <Form.Item label="商品图片"  >
                        {/* 子组件给父组件传递一个方法 */}
                        <PicturesWall ref={this.pw} imgs={imgs}></PicturesWall>
                    </Form.Item>
                    <Form.Item label="商品详情" labelCol={{ span: 2 }} wrapperCol={{ span: 20 }} >
                        <Editor ref="ed" detail={detail} ></Editor>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" onClick={this.submit}>提交</Button>
                    </Form.Item>

                </Form>
            </Card>
        )
    }
}
export default Form.create()(Addproduct)
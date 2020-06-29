import React, { Component ,} from 'react'
import PropTypes from 'prop-types'
import { Form, Select, Input } from 'antd'

const { Option } = Select;

 class Updatecategory extends Component {
    // 数据校验
    static propTypes = {
        categoryName: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
      }
      componentWillMount(){
          //将form对象通过setForm()传递父组件
          //也即是子传父
          this.props.setForm(this.props.form)
      }
    render() {
        let {categoryName} =this.props;
        const {getFieldDecorator}=this.props.form
        return (
            <Form >
                <Form.Item name="user" >
                    {
                        getFieldDecorator('categoryName',{
                            initialValue:categoryName,
                            rules:[
                                {required:true,message:"分类名称必须输入"}
                            ]
                        })(
                            <Input placeholder='请输入分类名称'></Input>
                        )
                    }
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(Updatecategory)
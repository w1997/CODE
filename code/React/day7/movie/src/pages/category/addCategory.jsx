import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Select, Input } from 'antd'

const { Option } = Select;
class Addcategory extends Component {
    static propTypes = {
        categorys: PropTypes.array.isRequired,
        setForm: PropTypes.func.isRequired,
        parentId: PropTypes.string.isRequired,
    }
    componentWillMount() {
        // 将form对象通过setForm()传递父组件
        this.props.setForm(this.props.form)
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const { categorys, parentId } = this.props
        return (
            <Form>
                <Form.Item>
                    {getFieldDecorator('parentId', {
                        initialValue: parentId,
                    })(
                        <Select>
                            <Option value="0">一级分类列表</Option>
                            {
                                categorys.map(c => <Option value={c._id}>{c.name}</Option>)
                            }
                            {/* {categorys.map(c=> <Option value={c_id}>{c_name}</Option>)}     */}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('categoryName', {
                            initialValue: ''
                        })(<Input placeholder="请输入分类名称" />)
                    }

                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(Addcategory)
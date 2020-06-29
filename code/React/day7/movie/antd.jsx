import React, { useState, useEffuseRefect,  } from 'react';
import { Form, Input, InputNumber, Modal, Button, Avatar, Typography } from 'antd';
import { SmileOutlined, UserOutlined } from '@ant-design/icons';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

// reset form fields when modal is form, closed
const useResetFormOnCloseModal = ({ form, visible }) => {
  const prevVisibleRef = useRef();
//   useEffect()用来引入具有副作用的操作，最常见的就是向服务器请求数据。
// 以前，放在componentDidMount里面的代码，现在可以放在useEffect()。
// 当组件的参数from，visible发生变化，useEffect()方法就会执行。
// 组件第一次渲染时，useEffect()也会执行。

  useEffect(() => {
    prevVisibleRef.current = visible;
  }, [visible]);
  const prevVisible = prevVisibleRef.current;
  useEffect(() => {
    if (!visible && prevVisible) {
      form.resetFields();
    }
  }, [visible]);
};

const ModalForm = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  useResetFormOnCloseModal({
    form,
    visible,
  });
// 弹框中点击确定的调用的方法
  const onOk = () => {
    form.submit();
  };

  return ( 
    //   这是一个弹框，点击AddUser ，回调用显示弹框的方法
    <Modal title="Basic Drawer" visible={visible} onOk={onOk} onCancel={onCancel}>
     {/*弹框内的表单内容*/}
     {/*  Form中的name属性，当表单更新时，会触发Form中的provider中onFormFinish*/}
      <Form form={form} layout="vertical" name="userForm">
        {/* 两个input输入框 */}
        <Form.Item
          name="name"
          label="User Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="age"
          label="User Age"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
};
// 相当于是App.JS中的内容
const Demo = () => { 
    // useState()用于为函数组件引入状态（state）
    //useState()这个函数接受状态的初始值，作为参数，上例的初始值为按钮的文字。该函数返回一个数组，数组的第一个成员是一个变量（上例是buttonText），指向状态的当前值。
    // 第二个成员是一个函数，用来更新状态，约定是set前缀加上状态的变量名（上例是setButtonText）。
   //即第一个值是状态的初始值，第二个为改变状态的值
    const [visible, setVisible] = useState(false);
//显示弹框
  const showUserModal = () => {
    setVisible(true);
  };
  //隐藏弹框
  const hideUserModal = () => {
    setVisible(false);
  };
//提交外面的表单
  const onFinish = values => {
    console.log('Finish:', values);
  };

  return (
    <div>
      <Form.Provider
        onFormFinish={(name, { values, forms }) => {
          if (name === 'userForm') {
            const { basicForm } = forms;
            const users = basicForm.getFieldValue('users') || [];
            basicForm.setFieldsValue({
              users: [...users, values],
            });
            setVisible(false);
          }
        }}
      >
        <Form {...layout} name="basicForm" onFinish={onFinish}>
          <Form.Item
            name="group"
            label="Group Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="User List"
            shouldUpdate={(prevValues, curValues) => prevValues.users !== curValues.users}
          >
            {({ getFieldValue }) => {
              const users = getFieldValue('users') || [];
              return users
            }}
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button
              htmlType="button"
              style={{
                margin: '0 8px',
              }}
              onClick={showUserModal}
            >
              Add User
            </Button>
          </Form.Item>
        </Form>

        <ModalForm visible={visible} onCancel={hideUserModal} />
      </Form.Provider>
    </div>
  );
};

ReactDOM.render(<Demo />, mountNode);
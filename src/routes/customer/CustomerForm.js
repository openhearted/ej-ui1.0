import React from 'react';
import {Form,Modal,Input,Radio} from 'antd'

class CustomerForm extends React.Component {

  render(){
    const formLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
    }
    // 父组件传递给子组件值
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;
    getFieldDecorator('id');
    getFieldDecorator('status');
    getFieldDecorator('photo');
    return (
      <Modal
          visible={visible}
          title="添加顾客信息"
          okText="提交"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical" {...formLayout}>
            <Form.Item label="姓名" >
              {getFieldDecorator('realname', {
                rules: [{ required: true, message: '请输入姓名!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="手机号">
              {getFieldDecorator('telephone', {
                rules: [{ required: true, message: '请输入手机号!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="密码">
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(<Input.Password />)}
            </Form.Item>
          </Form>
        </Modal>
    );
  }
}

// 将通过props从父组件中获取的值拿出来设置到表单元素上
const mapPropsToFields = (props)=>{
    let obj = {};
    for(let key in props.initData){
      let val = props.initData[key];
      obj[key] = Form.createFormField({value:val})
    }
    return obj;
  }

export default Form.create({
  mapPropsToFields
})(CustomerForm);
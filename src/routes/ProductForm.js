import React from 'react';
import {Form,Modal,Input,Radio} from 'antd'

class ProductForm extends React.Component {

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
          title="添加商品信息"
          okText="提交"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical" {...formLayout}>
            <Form.Item label="商品名称" >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入商品名称!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="商品描述">
              {getFieldDecorator('description', {
                rules: [{ required: true, message: '请输入商品描述!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="商品价格">
              {getFieldDecorator('price', {
                rules: [{ required: true, message: '请输入商品价格!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="商品图片">
                {getFieldDecorator('photo', {
                  rules: [{ required: true, message: '请添加商品图片!' }],
                })(<Input />)}
              </Form.Item>
            <Form.Item label="状态">
              {getFieldDecorator('status', {
                rules: [{ required: true, message: '请输入状态值!' }],
              })(<Input />)}
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
})(ProductForm);
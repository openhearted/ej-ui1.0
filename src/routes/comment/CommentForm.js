import React from 'react';
import {Form,Modal,Input,Radio} from 'antd'

class CommentForm extends React.Component {

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
          title="更新评论信息"
          okText="提交"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical" {...formLayout}>
            <Form.Item label="订单编号">
              {getFieldDecorator('order_id', {
                rules: [{ required: true, message: '请输入订单编号!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="内容" >
              {getFieldDecorator('content', {
                rules: [{ required: true, message: '请输入内容!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="评论时间">
              {getFieldDecorator('comment_time', {
                rules: [{ required: true, message: '请输入评论时间!' }],
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
})(CommentForm);
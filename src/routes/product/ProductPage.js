import React from 'react';
// 引入css进行页面美化
import styles from '../IndexPage.css'
// 导入组件
// 导入组件
import {Modal,Button,Table,message,Breadcrumb,Input} from 'antd'
import { Link } from 'dva/router';
import axios from '../../utils/axios'
import ProductForm from './ProductForm'
import Zmage from 'react-zmage'
const Search = Input.Search;

// 组件类必须要继承React.Component，是一个模块，顾客管理子功能
class ProductPage extends React.Component {
  // 局部状态state
  constructor(){
    super();
    this.state = {
      idList:[], // 批量删除的时候保存的id
      list:[],
      loading:false,
      visible:false,
      product:{}
    }
  }
  // 在生命周期钩子函数中调用重载数据
  componentDidMount(){
    this.reloadData();
  }

  // 重载数据
  reloadData(){
    this.setState({loading:true});
    axios.get("http://129.211.69.98:8888/product/findAllProduct")
    .then((result)=>{
      // 将查询数据更新到state中
      this.setState({list:result.data})
    })
    .finally(()=>{
      this.setState({loading:false});
    })
  }
  // 批量删除
  handleBatchDelete(){
    Modal.confirm({
      title: '确定删除这些商品吗?',
      content: '一旦删除数据将无法恢复',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk:() => {
        axios.post("http://129.211.69.98:8888/product/deleteBathProduct",{idList:this.state.idList})
        .then((result)=>{
          //批量删除后重载数据
          message.success(result.statusText)
          this.reloadData();
        })
      }
    });
  }

  // 单个删除
  handleDelete(id){
    Modal.confirm({
      title: '确定删除这件商品吗?',
      content: '一旦删除数据将无法恢复',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk:() => {
        // 删除操作
        axios.get("http://129.211.69.98:8888/product/deleteProductById",{
          params:{
            id:id
          }
        })
        .then((result)=>{
          // 删除成功后提醒消息，并且重载数据
          message.success(result.statusText);
          this.reloadData();
        })
      }
    });
  }

  // 模态框的取消按钮的事件处理函数
  handleCancel = () => {
    this.setState({ visible: false });
  };
  // 模态框的确认按钮的事件处理函数
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      // 表单校验完成后与后台通信进行保存
      axios.post("http://129.211.69.98:8888/product/insertProduct",values)
      .then((result)=>{
        message.success(result.statusText)
        // 重置表单
        form.resetFields();
        // 关闭模态框
        this.setState({ visible: false });
        this.reloadData();
      })
      axios.post("http://129.211.69.98:8888/product/updateProduct",values)
      .then((result)=>{
        message.success(result.statusText)
        this.setState({ visible: false });
        this.reloadData();
      })
    });
  };
  // 将子组件的引用在父组件中进行保存，方便后期调用
  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  // 去添加
  toAdd(){
    // 将默认值置空,模态框打开
    this.setState({product:{},visible:true})
  }
  // 去更新
  toEdit(record){
    // 更前先先把要更新的数据设置到state中
    this.setState({product:record})
    // 将record值绑定表单中
    this.setState({visible:true})
  }
  // 模糊查询
  query = (value) =>{
    this.setState({loading:true});
    axios.get("http://129.211.69.98:8888/product/queryCustomer",{
      params:{
        name:value
      }
    })
    .then((result)=>{
      // 将查询数据更新到state中
      this.setState({list:result.data})
    })
    .finally(()=>{
      this.setState({loading:false});
    })
  }

  // 组件类务必要重写的方法，表示页面渲染
  render(){
    // const { getFieldDecorator} = this.props.form;
    // 变量定义
    let columns = [{
      title:'商品名称',
      align:"center",
      dataIndex:'name'
    },{
      title:'商品描述',
      align:"center",
      dataIndex:'description'
    },{
      title:'价格',
      align:"center",
      dataIndex:'price'
    },{
      title:'所属分类',
      align:"center",
      dataIndex:'categoryId'
    },{
      title:'商品图片',
      align:"center",
      dataIndex:'photo',
      render(text){
        return (
          <Zmage width={40} height={40} src={"http://134.175.154.93:8888/group1/"+text}/>
        )
      }
    },{
      title:'操作',
      width:120,
      align:"center",
      render:(text,record)=>{
        return (
          <div>
            <Button type='link' size="small" onClick={this.handleDelete.bind(this,record.id)}>删除</Button>
            <Button type='link' size="small" onClick={this.toEdit.bind(this,record)}>修改</Button>
          </div>
        )
      }
    }]
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        // 当用户操作复选按钮的时候，将值获取到并且保存到state中
        this.setState({
          idList:selectedRowKeys
        })
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    
    // 返回结果 jsx(js + xml)
    return (      
      <div className={styles.all}>
        {/* <div className={styles.title}>产品管理</div> */}
        <Breadcrumb>
          <Breadcrumb.Item>
          <Link to="/">
                <span className={styles.navitem}>主页</span>
              </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a className={styles.href}>产品列表</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.btns}>
          <Button onClick={this.toAdd.bind(this)}>添加</Button> &nbsp;
          <Button onClick={this.handleBatchDelete.bind(this)}>批量删除</Button> &nbsp;
          <div className={styles.search}>
          <Search
                placeholder="请输入您想要查询的内容"
                onSearch={value => this.query(value)}
                style={{ width: 200 }}
            />
          </div>
        </div>
        <Table 
          bordered
          rowKey="id"
          size="small"
          loading={this.state.loading}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.list}/>

        <ProductForm
          initData={this.state.product}
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}/>
      </div>
    )
  }
}

export default ProductPage;
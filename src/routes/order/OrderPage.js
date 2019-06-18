import React from 'react';
import styles from '../IndexPage.css'
import {Modal,Button, Table,message,Breadcrumb,Input} from 'antd'
import { Link } from 'dva/router';
import axios from '../../utils/axios'
import OrderForm from './OrderForm'
import { exportExcel } from 'xlsx-oc'
const Search = Input.Search;

// 组件类必须要继承React.Component，是一个模块，顾客管理子功能
class OrderPage extends React.Component {
  // 局部状态state
  constructor(){
    super();
    this.state = {
      ids:[], // 批量删除的时候保存的id
      list:[],
      loading:false,
      visible:false,
      order:{}
    }
  }
  // 在生命周期钩子函数中调用重载数据
  componentDidMount(){
    this.reloadData();
  }

  // 重载数据
  reloadData(){
    this.setState({loading:true});
    axios.get("http://129.211.69.98:8888/order/findAllOrder")
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
      title: '确定删除这些记录吗?',
      content: '一旦删除数据将无法恢复',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk:() => {
        axios.post("http://129.211.69.98:8888/order/batchDeleteOrder",{ids:this.state.ids})
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
      title: '确定删除这条记录吗?',
      content: '一旦删除数据将无法恢复',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk:() => {
        // 删除操作
        axios.get("http://129.211.69.98:8888/order/deleteOrderById",{
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

  // 取消按钮的事件处理函数
  handleCancel = () => {
    this.setState({ visible: false });
  };
  // 确认按钮的事件处理函数
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      // 表单校验完成后与后台通信进行保存
      axios.post("http://129.211.69.98:8888/order/insertOrder",values)
      .then((result)=>{
        message.success(result.statusText)
        // 重置表单
        form.resetFields();
        // 关闭模态框
        this.setState({ visible: false });
        this.reloadData();
      })
    });
  };
  // 将子组件的引用在父组件中进行保存，方便后期调用
  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  //模糊查询
  query = (value) =>{
    this.setState({loading:true});
    axios.get("http://129.211.69.98:8888/order/queryOrder",{
      params:{
        id: value,
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
    // 变量定义
    let columns = [{
      title:'顾客编号',
      align:"center",
      dataIndex:'customerId'
    },{
      title:'地址编号',
      align:"center",
      dataIndex:'addressId'
    },{
      title:'下单时间',
      align:"center",
      dataIndex:'orderTime'
    },{
      title:'员工编号',
      align:"center",
      dataIndex:'waiterId'
    },{
      title:'总计个数',
      align:"center",
      dataIndex:'total'
    },{
      title:'操作',
      width:120,
      align:"center",
      render:(text,record)=>{
        return (
          <div>
            <Button type='link' size="small" onClick={this.handleDelete.bind(this,record.id)}>删除</Button>
          </div>
        )
      }
    }]
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        // 当用户操作复选按钮的时候，将值获取到并且保存到state中
        this.setState({
          ids:selectedRowKeys
        })
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    const dataSource = [{
      key: '1',
      cs: 'customerId',
      sm: 'addressId',
      lx: 'orderTime',
      mrz: 'waiterId',
      }
      // , {
      //     key: '2',
      //     cs: 'mm',
      //     sm: '啦啦啦啦',
      //     lx: 'string',
      //     mrz: '',
      // }
    ];
      const exportDefaultExcel = () => {
        var _headers = [{ k: 'cs', v: '顾客编号' }, { k: 'sm', v: '地址编号' },
        { k: 'lx', v: '下单时间' }, { k: 'mrz', v: '员工编号' },]
        exportExcel(_headers, dataSource);
    }
    // 返回结果 jsx(js + xml)
    return (
      <div className={styles.all}>
          <Breadcrumb>
          <Breadcrumb.Item>
          <Link to="/">
                <span className={styles.navitem}>主页</span>
              </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a className={styles.href}>订单管理</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.btns}>
          <Button onClick={this.handleBatchDelete.bind(this)}>批量删除</Button> &nbsp;
          <Button onClick={() => exportDefaultExcel()}>导出</Button>
          <div className={styles.search}>
          <div className={styles.search}>
          <Search
                placeholder="请输入..."
                onSearch={value => this.query(value)}
                style={{ width: 200 }}
          />
          </div>
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

        <OrderForm
          initData={this.state.order}
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}/>
      </div>
    )
  }
}

export default OrderPage;
import React from 'react';
// 引入css进行页面美化
import styles from './IndexPage.css'
// 导入组件
import {Button, Table} from 'antd'
import axios from '../utils/axios'

// 组件类必须要继承React.Component，是一个模块，顾客管理子功能
class CustomerPage extends React.Component {
  // 局部状态state
  constructor(){
    super();
    this.state = {
      list:[],
      loading:false
    }
  }
  // 在生命周期钩子函数中调用重载数据
  componentDidMount(){
    this.reloadData();
  }

  // 重载数据
  reloadData(){
    this.setState({loading:true});
    axios.get("/customer/findAll")
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
      title:'姓名',
      dataIndex:'realname'
    },{
      title:'手机号',
      dataIndex:'telephone'
    },{
      title:'状态',
      dataIndex:'status'
    },{
      title:'操作',
      render:function(){
        return (
          <div>
            <Button type='link' size="small">删除</Button>
          </div>
        )
      }
    }]
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    
    // 返回结果 jsx(js + xml)
    return (
      <div className={styles.customer}>
        <div className={styles.title}>顾客管理</div>
        <div className={styles.btns}>
          <Button>添加</Button> &nbsp;
          <Button>批量删除</Button> &nbsp;
          <Button type="link">导出</Button>
        </div>
        <Table 
          bordered
          rowKey="id"
          size="small"
          loading={this.state.loading}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.list}/>

      </div>
    )
  }
}

export default CustomerPage;
import React from 'react'
import styles from './IndexPage.css'
import {Modal,Button,Table,message} from 'antd'
import axios from '../utils/axios'

class WaiterPage extends React.Component{
    constructor(){
        super();
        this.state = {
          ids:[],//批量删除的时候保存的id
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
        axios.get("/waiter/findAll")
        .then((result)=>{
          // 将查询数据更新到state中
          this.setState({list:result.data})
        })
        .finally(()=>{
          this.setState({loading:false});
        })
      }
      //批量删除
      handleBatchDelete(){
        Modal.confirm({
          title: '你确认删除这些记录吗?',
          content: '一旦确认将无法恢复',
          okText: '确认',
          okType: 'danger',
          cancelText: '取消',
          onOk:()=>{
            axios.post("/waiter/batchDelete",{ids:this.state.ids})
            .then((result)=>{
              message.success(result.statusText)
              this.reloadData()
            })
          },
        });
      }
      //删除
      handleDelete(id){
        //传递到后台
        Modal.confirm({
          title: '你确认删除这条记录吗?',
          content: '一旦确认将无法恢复',
          okText: '确认',
          okType: 'danger',
          cancelText: '取消',
          onOk:()=>{
            axios.get("/waiter/deleteById",{
              params:{
                id:id
              }
            })
            .then((result)=>{
              message.success(result.statusText)
              this.reloadData()
            })
          },
        });
      }
    render(){
        let columns = [
            {
                title:'电话',
                dataIndex:'telephone'
            },{
                title:'密码',
                dataIndex:'password'
            },
            {
                title:'姓名',
                dataIndex:'realname'
            },{
                title:'工号',
                dataIndex:'idcard'
            },{
                title:'状态',
                dataIndex:'status'
            },{
                title:'操作',
                width:200,
                align:"center",
                render:(text,record)=>{
                    return (
                    <div>
                        <Button type='link' size="small" onClick = {this.handleDelete.bind(this,record.id)}>删除</Button>
                        <Button type='link' size="small">修改</Button>
                    </div>
                    )
                }
            }]
            const rowSelection = {
                onChange: (selectedRowKeys, selectedRows) => {
                  //当用户操作复选按钮的时候，将值获取并且保存到state中
                  this.setState({
                    ids:selectedRowKeys
                  })
                },
                getCheckboxProps: record => ({
                  disabled: record.name === 'Disabled User', // Column configuration not to be checked
                  name: record.name,
                }),
              };
              return (
                <div className={styles.waiter}>
                  <div className={styles.title}>服务人员管理</div>
                  <div className={styles.btns}>
                    <Button>添加</Button> &nbsp;
                    <Button onClick = {this.handleBatchDelete.bind(this)}>批量删除</Button> &nbsp;
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
export default WaiterPage;
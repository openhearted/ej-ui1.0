import React from 'react'
import styles from '../IndexPage.css'
import {Modal,Button,Table,message,Breadcrumb,Input} from 'antd'
import axios from '../../utils/axios'
import WaiterForm from './WaiterForm'
import { Link } from 'dva/router';
import { exportExcel } from 'xlsx-oc'
import Zmage from 'react-zmage'
const Search = Input.Search;

class WaiterPage extends React.Component{
    constructor(){
        super();
        this.state = {
          ids:[],//批量删除的时候保存的id
          list:[],
          loading:false,
          visible:false,
          waiter:{}
        }
      }
      // 在生命周期钩子函数中调用重载数据
      componentDidMount(){
        this.reloadData();
      }
    
      // 重载数据
      reloadData(){
        this.setState({loading:true});
        axios.get("http://129.211.69.98:8888/waiter/findAllWaiter")
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
          title: '确定删除这些记录吗?',
          content: '一旦删除数据将无法恢复',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk:()=>{
            axios.post("http://129.211.69.98:8888/waiter/batchDeleteWaiter",{ids:this.state.ids})
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
          title: '确定删除这条记录吗?',
          content: '一旦删除数据将无法恢复',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk:()=>{
            axios.get("http://129.211.69.98:8888/waiter/deleteWaiterById",{
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

      // 取消按钮的事件处理函数
  handleCancel = () => {
    this.setState({ visible: false });
  };
  
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      // 表单校验完成后与后台通信进行保存
      axios.post("http://129.211.69.98:8888/waiter/insertWaiter",values)
      .then((result)=>{
        message.success(result.statusText)
        // 重置表单
        form.resetFields();
        // 关闭模态框
        this.setState({ visible: false });
        this.reloadData();
      })
      axios.post("http://129.211.69.98:8888/waiter/updateWaiter",values)
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
    this.setState({waiter:{},visible:true})
  }
  // 去更新
  toEdit(record){
    // 更前先先把要更新的数据设置到state中
    this.setState({waiter:record})
    // 将record值绑定表单中
    this.setState({visible:true})
  }

  queryId(id){
    this.setState({loading:true});
    axios.get("http://129.211.69.98:8888/waiter/findWaiterById",{
      params:{
        id:id
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
  query = (value)=>{
    this.setState({loading:true});
    axios.get("http://129.211.69.98:8888/waiter/queryWaiter",{
      params:{
        realname:value
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

  toDetails(record){
    this.props.history.push({
      pathname:"/waiterDetails",
      payload:record
    })
  }

    render(){
        let columns = [{
            title:'工号',
            align:"center",
            dataIndex:'idcard'
        },{
            title:'姓名',
            align:"center",
            dataIndex:'realname'
        },{
          title:'密码',
          align:"center",
          dataIndex:'password'
        },{
            title:'电话',
            align:"center",
            dataIndex:'telephone'
        },{
            title:'状态',
            align:"center",
            dataIndex:'status'
        },,{
          title:'照片',
          align:"center",
          dataIndex:'photo',
          render(text){
            return (
              <Zmage width={40} height={40} src={"http://134.175.154.93:8888/group1/"+text}/>
            )
          }
        },{
            title:'操作',
            width:200,
            align:"center",
            render:(text,record)=>{
                return (
                <div>
                    <Button type='link' size="small" onClick = {this.handleDelete.bind(this,record.id)}>删除</Button>
                    <Button type='link' size="small" onClick={this.toEdit.bind(this,record)}>修改</Button>
                    <Button type='link' size="small" onClick={this.toDetails.bind(this,record)}>详情</Button>
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

          const _headers = [
            { k: 'idcard', v: '工号' }, 
            { k: 'realname', v: '姓名' },
            { k: 'password', v: '密码' }, 
            { k: 'telephone', v: '电话' }
          ];
              
          const exportDefaultExcel = () => {
            exportExcel(_headers, this.state.list);
          }
          return (
            <div className={styles.all}>
              <Breadcrumb>
              <Breadcrumb.Item>
              <Link to="/">
                    <span className={styles.navitem}>主页</span>
                  </Link>
              </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a className={styles.href}>员工管理</a>
                </Breadcrumb.Item>
              </Breadcrumb>
              <div className={styles.btns}>
                <Button onClick={this.toAdd.bind(this)}>添加</Button> &nbsp;
                <Button onClick={this.handleBatchDelete.bind(this)}>批量删除</Button> &nbsp;
                <Button onClick={() => exportDefaultExcel()}>导出</Button>
                <div className={styles.search}>
                <Search
                      placeholder="请输入..."
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
              <WaiterForm
                initData={this.state.waiter}
                wrappedComponentRef={this.saveFormRef}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                onCreate={this.handleCreate}/>
            </div>
          )
    }
}

export default WaiterPage;
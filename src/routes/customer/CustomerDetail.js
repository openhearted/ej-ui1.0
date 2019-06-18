import React from 'react';
import { Tabs, Button,Table } from 'antd';
import axios from '../../utils/axios'


class CustomerDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          customer:{},
          address:[],
          orders:[]
        }
      }

// 在生命周期钩子函数中调用重载数据
    componentDidMount(){
        //   console.log(JSON.stringify(this.props.location.payload))
        let payload = this.props.location.payload;
        if(payload){
            this.setState({customer:payload})
            this.loadAddress();
            this.loadOrders();
          } else {
            this.props.history.push("/customer")
          }
    }

    //加载地址信息
  loadAddress(){
    axios.get("http://129.211.69.98:8888/address/query",{
      params:{
          customerId:this.props.location.payload.id
        }
    })
    .then((result)=>{
      this.setState({
        address:result.data
      })
    })
  }
   //加载订单信息
   loadOrders(){
    axios.get("http://129.211.69.98:8888/order/query",{
      params:{customerId:this.props.location.payload.id}
    })
    .then((result)=>{
      this.setState({
        orders:result.data
      })
    })
  }
// 修改头像
    modifyphoto(){

    }

    render(){

      
      let columns1 = [{
        title:'省份',
        align:"center",
        dataIndex:'province'
      },{
        title:'城市',
        align:"center",
        dataIndex:'city'
      },{
        title:'地区',
        align:"center",
        dataIndex:'area'
      },{
        title:'地址',
        align:"center",
        dataIndex:'address'
      }]
      let columns2 = [{
        title:'订单编号',
        align:"center",
        dataIndex:'id'
      },{
        title:'下单时间',
        align:"center",
        dataIndex:'orderTime'
      },{
        title:'服务员id',
        align:"center",
        dataIndex:'waiterId'
      },{
        title:'总计',
        align:"center",
        dataIndex:'total'
      }]
        const { TabPane } = Tabs;
        function callback(key) {
            console.log(key);
          }
        const operations = <Button type="link" onClick={()=>{this.props.history.goBack()}}>返回</Button>;
        return(
            <div>
                <Tabs onChange={callback} tabBarExtraContent={operations}>
                    <TabPane tab="个人信息" key="1">
                      <p>{this.state.customer.realname}</p>
                      <p>{this.state.customer.telephone}</p>
                      <img alt="图片找不到..." src={this.state.customer.photo}/>
                    </TabPane>
                    <TabPane tab="地址信息" key="2">
                        {/* {JSON.stringify(this.state.address)} */}
                        <Table 
                          // bordered
                          // rowKey="id"
                          // size="small"
                          // loading={this.state.loading}
                          // rowSelection={rowSelection}
                          columns={columns1}
                          dataSource={this.state.address}/>
                    </TabPane>
                    <TabPane tab="订单信息" key="3">
                        {/* {JSON.stringify(this.state.orders)} */}
                        <Table 
                          columns={columns2}
                          dataSource={this.state.orders}/>
                    </TabPane>
                </Tabs>
            </div>
            
        )
    }
}
export default CustomerDetail
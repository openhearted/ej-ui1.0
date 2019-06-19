import React from 'react'
import { Tabs, Button,Table } from 'antd';
import axios from '../../utils/axios'

class Order_linePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          product:{},
          address:[],
          orders:[]
        }
      }

// 在生命周期钩子函数中调用重载数据
    componentDidMount(){
        //   console.log(JSON.stringify(this.props.location.payload))
        let payload = this.props.location.payload;
        if(payload){
            this.setState({product:payload})
          } else {
            this.props.history.push("/product")
          }
    }
   
    render(){ 
      let columns1 = [{
        title:'评价内容',
        align:"center",
        dataIndex:'content'
      },{
        title:'评价时间',
        align:"center",
        dataIndex:'comment_time'
      },{
        title:'订单id',
        align:"center",
        dataIndex:'order_id'
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
                      {/* <p>{this.state.product.status}</p> */}
                      <img alt="图片找不到..." src={"http://134.175.154.93:8888/group1/"+this.state.product.photo}/>
                    </TabPane>
                </Tabs>
            </div>
            
        )
    }
}
export default Order_linePage;
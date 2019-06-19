import React from 'react';
import { Tabs, Button,Table } from 'antd';
import axios from '../../utils/axios'

class CommentDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          order:{},
          order:[],
        }
      }

// 在生命周期钩子函数中调用重载数据
    componentDidMount(){
        //   console.log(JSON.stringify(this.props.location.payload))
        let payload = this.props.location.payload;
        if(payload){
            this.setState({order:payload})
            this.loadCustomer();
          } else {
            this.props.history.push("/order")
          }
    }

    //加载订单信息
  loadCustomer(){
    axios.get("http://129.211.69.98:8888/order/query",{
      params:{
        id:this.props.location.payload.orderId
        }
    })
    .then((result)=>{
      this.setState({
        address:result.data
      })
    })
  }
  
    render(){
    
        const { TabPane } = Tabs;
        function callback(key) {
            console.log(key);
          }
        const operations = <Button type="link" onClick={()=>{this.props.history.goBack()}}>返回</Button>;
        return(
            <div>
                <Tabs onChange={callback} tabBarExtraContent={operations}>
                    <TabPane tab="详细信息" key="1">
                      <p>{this.state.order.customerId}</p>
                    </TabPane>
                </Tabs>
            </div>
            
        )
    }
}
export default CommentDetail
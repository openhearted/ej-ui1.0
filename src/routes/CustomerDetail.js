import React from 'react';
import { Tabs, Icon,Button ,Table} from 'antd';
import styles from './IndexPage.css'
import { Link } from 'dva/router';
const { TabPane } = Tabs;


class CustomerDetail extends React.Component{
    constructor(){
        super();
        this.state = {

        }
      }

// 在生命周期钩子函数中调用重载数据
  componentDidMount(){
      
  }
// 修改头像
    modifyphoto(){

    }

    render(){
        function callback(key) {
            console.log(key);
          }

        const operations = <Button type="link" onClick={()=>{this.props.history.goBack()}}>返回</Button>;

        // let columns = [
        //     {
        //     title:'姓名',
        //     align:"center",
        //     dataIndex:'realname'
        //   },{
        //     title:'联系方式',
        //     align:"center",
        //     dataIndex:'telephone'
        //   },{
        //     title:'头像',
        //     align:"center",
        //     dataIndex:'status'
        //   },{
        //     title:'操作',
        //     width:200,
        //     align:"center",
        //     render:(text,record)=>{
        //       return (
        //         <div>
        //           <Button type='link' size="small" onClick={this.modifyphoto.bind(this,record.id)}>修改头像</Button>
        //         </div>
        //       )
        //     }
        //   }
        // ]
        return(
            <div>
                <Tabs onChange={callback} tabBarExtraContent={operations}>
                    <TabPane tab="个人信息" key="1">
                        <span>
                            <form>
                                <p>张三</p>
                                <p>18896821234</p>
                                <img src="https://img3.duitang.com/uploads/item/201605/03/20160503183705_KYdaZ.thumb.700_0.jpeg"/>
                            </form>
                        </span>
                    </TabPane>
                    <TabPane tab="地址信息" key="2">
                        <span>
                            <p>地址列表</p>
                            <p>收货地址</p>
                            <p>添加地址</p>
                        </span>
                    </TabPane>
                    <TabPane tab="订单信息" key="3">
                        <span></span>
                    </TabPane>
                </Tabs>
                {/* <Table 
                    bordered
                    rowKey="id"
                    size="small"
                    loading={this.state.loading}
                    columns={columns}
                    dataSource={this.state.list}/> */}
            </div>
            
        )
    }
}
export default CustomerDetail
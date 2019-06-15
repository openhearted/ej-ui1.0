import React from 'react';
import { Tabs, Icon,Button } from 'antd';
import styles from './IndexPage.css'
import { Link } from 'dva/router';
const { TabPane } = Tabs;


class CustomerDetail extends React.Component{
    render(){
        function callback(key) {
            console.log(key);
          }

        const operations = <Button type="link" onClick={()=>{this.props.history.goBack()}}>返回</Button>;

        return(
            <div>
                <Tabs onChange={callback} tabBarExtraContent={operations}>
                    <TabPane tab="个人信息" key="1">
                    <Link to="/customer">
                        <Icon type="user" />
                        <span className={styles.navitem}>顾客管理</span>
                    </Link>
                    </TabPane>
                    <TabPane tab="地址信息" key="2">
                    地址信息
                    </TabPane>
                    <TabPane tab="订单信息" key="3">
                    订单信息
                    </TabPane>
                </Tabs>
            </div>
            
        )
    }
}
export default CustomerDetail
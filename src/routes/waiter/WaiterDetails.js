import React from 'react';
import { Tabs, Button, Avatar, Card ,message,Form,Icon,Upload} from 'antd';
import styles from '../IndexPage.css'
import axios from '../../utils/axios';

class WaiterDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            waiter: {},

        }
    }

    // 在生命周期钩子函数中调用重载数据
    componentDidMount() {
        let payload = this.props.location.payload;
        if (payload) {
            this.setState({ waiter: payload })
            // this.loadAddress(payload.id);
            // this.loadOrders();
        } else {
            this.props.history.push("/waiter")
        }
    }
    render() {
        const { TabPane } = Tabs;
        function callback(key) {
            console.log(key);
        }


        const operations =<Button type="link" onClick={()=>{this.props.history.goBack()}}>返回</Button>;
        return (
            <div className={styles.content}>
                
                <Tabs onChange={callback} defaultActiveKey="1" tabBarExtraContent={operations}>
                    
                    <TabPane tab="个人信息" key="1">
                    
                      <img alt="图片找不到..." src={"http://134.175.154.93:8888/group1/"+this.state.waiter.photo}/>
                    </TabPane>
                </Tabs>
            </div>

        )
    }
}
export default WaiterDetails
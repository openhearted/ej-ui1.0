import React from 'react';
// 引入css进行页面美化
import styles from './IndexPage.css'
import { Link } from 'dva/router';
import {Layout, Menu, Breadcrumb, Icon,Button} from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
class MainPage extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh'}}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}
        style={{
          opacity: 0.9,
        }}
        >
          <div className={styles.logo}/>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" >
            <Menu.Item key="1">
              <Link to="/customer">
                <Icon type="user" />
                <span className={styles.navitem}>顾客管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
            <Link to="/address">
                <Icon type="global" />
                <span className={styles.navitem}>地址管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
            <Link to="/product">
                <Icon type="inbox" />
                <span className={styles.navitem}>商品管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
            <Link to="/waiter">
                <Icon type="team" />
                <span className={styles.navitem}>服务员管理</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="menu" />
                  <span>分类管理</span>
                </span>
              }
            >
              <Menu.Item key="5"><Icon type="skin" />洗护</Menu.Item>
              <Menu.Item key="6"><Icon type="car" />保洁</Menu.Item>
              <Menu.Item key="7"><Icon type="woman" />月嫂</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}
           onBack={() => window.history.back(-1)} 
           title="虎虎" 
           extra={[
             <Button key="1" type="primary">
               登录
             </Button>,
           ]}
           />
          <Content style={{ margin: '0 16px' }}>
              {/* <Breadcrumb style="brand-text brand-big visible text-uppercase">
                <strong style="text-primary">E洁家政</strong><strong>后台管理系统</strong>
                <strong style="text-primary">E</strong><strong>洁</strong>
              </Breadcrumb> */}

            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>E洁家政</Breadcrumb.Item>
              <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{this.props.children ? this.props.children : <h1 className={styles.title}>Bill is a cat!</h1>}</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>E洁家政后台管理系统</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default MainPage;
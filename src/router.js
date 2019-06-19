import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import AddressPage from './routes/address/AddressPage';
import CategoryPage from './routes/category/CategoryPage';
import CommentPage from './routes/comment/CommentPage';
import CustomerPage from './routes/customer/CustomerPage';
import Order_linePage from './routes/order/Order_linePage';
import OrderPage from './routes/order/OrderPage';
import ProductPage from './routes/product/ProductPage';
import WaiterPage from './routes/waiter/WaiterPage';
import MainPage from './routes/MainPage';
import CustomerDetails from './routes/customer/CustomerDetail'
import CommentDetail from './routes/comment/CommentDetail'
import WaiterDetails from './routes/waiter/WaiterDetails'
import ProductDetails from './routes/product/ProductDetail'
// import NormalLoginForm from './routes/login/NormalLoginForm'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={MainPage} />
          <MainPage>
              <Route path="/address" exact component={AddressPage} />
              <Route path="/category" exact component={CategoryPage} />
              <Route path="/comment" exact component={CommentPage} />
              <Route path="/customer" exact component={CustomerPage} />
              <Route path="/orderline" exact component={Order_linePage} />
              <Route path="/order" exact component={OrderPage} />
              <Route path="/product" exact component={ProductPage} />
              <Route path="/waiter" exact component={WaiterPage} />
              <Route path="/customerDetails" exact component={CustomerDetails} />
              <Route path="/commentDetail" exact component={CommentDetail} />
              <Route path="/waiterDetails" exact component={WaiterDetails} />
              <Route path="/productDetails" exact component={ProductDetails} />
              {/* <Route path="/NormalLoginForm" exact component={NormalLoginForm} /> */}
          </MainPage>
        </Switch>
    </Router>
  );
}

export default RouterConfig;


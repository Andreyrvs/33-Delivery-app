import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import ClientPage from './pages/ClientPage';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
import CheckoutPage from './pages/Checkout';
import ClientOrders from './pages/Orders';

function App() {
  return (
    <div>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/login" component={ LoginPage } />
        <Route path="/register" component={ Register } />
        <Route exact path="/customer/orders" component={ ClientOrders } />
        <Route exact path="/customer/products" component={ ClientPage } />
        <Route exact path="/customer/checkout" component={ CheckoutPage } />
        <Route path="*" component={ NotFound } />
      </Switch>
    </div>
  );
}

export default App;

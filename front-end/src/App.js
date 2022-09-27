import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import MyProvider from './context/MyProvider';
import Register from './components/Register';
import ClientPage from './pages/ClientPage';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
import CheckoutPage from './pages/CheckoutPage';
import OrderDetails from './pages/OrderDetails';

function App() {
  return (
    <div>
      <MyProvider>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route path="/login" component={ LoginPage } />
          <Route path="/register" component={ Register } />
          <Route exact path="/customer/products" component={ ClientPage } />
          <Route exact path="/customer/checkout" component={ CheckoutPage } />
           <Route exact path="/customer/orders/:id" component={ OrderDetails } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </MyProvider>
    </div>
  );
}

export default App;

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import ClientPage from './pages/ClientPage';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/login" component={ LoginPage } />
        <Route path="/register" component={ Register } />
        <Route exact path="/customer" component={ ClientPage } />
        <Route path="*" component={ NotFound } />
      </Switch>
    </div>
  );
}

export default App;

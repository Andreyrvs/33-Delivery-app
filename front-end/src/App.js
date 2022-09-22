import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Cadastro from './components/Cadastro';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ LoginPage } />
        <Route exact path="/login" component={ LoginPage } />
        <Route exact path="/register" component={ Cadastro } />
        <Route exact path="*" component={ NotFound } />
      </Switch>
    </div>
  );
}

export default App;

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Trybe from './pages/Trybe';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ LoginPage } />
        <Route exact path="/login" component={ LoginPage } />
        <Route exact path="/trybe" component={ Trybe } />
      </Switch>
    </div>
  );
}

export default App;

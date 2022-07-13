import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import MainHeader from './components/MainHeader';

function App() {
  return (
    <>
      <MainHeader />
      <Switch>
        <Route path="/carteira" component={ Wallet } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </>

  );
}

export default App;

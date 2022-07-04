import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  const link = <a href="https://lucasbitencourt.com.br/">Lucas Btencourt</a>;
  return (
    <>
      <div className="main-header">
        <p>
          Projeto feito por
          {' '}
          {link}
        </p>
      </div>
      <Switch>
        <Route path="/carteira" component={ Wallet } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </>

  );
}

export default App;

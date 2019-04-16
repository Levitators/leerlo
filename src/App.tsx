import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { StoreContext } from 'redux-react-hook';
import Login from './Login'
import Home from './Home'
import Redirect from './Redirect'
import { makeStore } from './store';

const App = () => {
  const store = makeStore();
  return (
    <StoreContext.Provider value={store}>
      <Router>
        <Route path="/" exact component={Login} />
        <Route path="/login-success" exact component={Redirect} />
        <Route path="/home" exact component={Home} />
      </Router>
    </StoreContext.Provider>
  );
}

export default App;

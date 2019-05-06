import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './Login'
import Home from './Home'
import Redirect from './Redirect'

const App = () => {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Login} />
        <Route path="/login-success" component={Redirect} />
        <Route path="/home" component={Home} />
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import Home from './Home.js';
import FeaturesList from './FeaturesList.js'
import LanguagesList from './LanguagesList.js'
import Signup from './Signup.js'
import Login from './Login.js'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Link to="/">Home</Link> 
        <Link to="/features">Features</Link>
        <Link to="/languages">Languages</Link>
        <Link to ="/signup">Sign up</Link>
        <Link to = "/login">Login</Link>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/features">
            <FeaturesList />
          </Route>
          <Route exact path="/languages">
            <LanguagesList />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

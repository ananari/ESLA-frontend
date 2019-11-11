import React from 'react';
import Home from './Home.js';
import FeaturesList from './FeaturesList.js'
import Feature from './Feature.js'
import LanguagesList from './LanguagesList.js'
import Language from './Language.js'
import Signup from './Signup.js'
import Login from './Login.js'
import User from './User.js'
import Navbar from './Navbar.js'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/features">
            <FeaturesList />
          </Route>
          <Route path="/features">
            <Feature />
          </Route>
          <Route exact path="/languages">
            <LanguagesList />
          </Route>
          <Route path="/languages">
            <Language />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route>
            { window.localStorage.getItem("token") ? <User id={window.localStorage.getItem("id")}/> : null }
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

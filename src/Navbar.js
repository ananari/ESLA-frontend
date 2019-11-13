import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
  constructor(){
    super();
    this.state = {
      username: window.localStorage.getItem("username") ? window.localStorage.getItem("username") : "",
      homeClass: "",
      featureClass: "",
      languageClass: "",
      signupClass: "",
      loginClass: "",
      userClass: ""
    }
  }

  componentDidMount(){
    this.activeAtMount();
  }

  handleLogout = () => {
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("username")
    window.localStorage.removeItem("id")
    this.setState({username: ""})
  }

  activeAtMount = () => {
    if(window.location.pathname.includes("features")) {
      this.setState({featureClass: "active"});
    }
    else if(window.location.pathname.includes("languages")) {
      this.setState({languageClass: "active"});
    }
    else if(window.location.pathname.includes("signup")) {
      this.setState({signupClass: "active"});
    }
    else if(window.location.pathname.includes("login")) {
      this.setState({loginClass: "active"});
    }
    else if(window.location.pathname.includes("users")) {
      this.setState({userClass: "active"});
    }
    else {
      this.setState({homeClass: "active"});
    }
  }

  setHomeActive = () => {
    this.setState({homeClass: "active",
    featureClass: "",
    languageClass: "",
    signupClass: "",
    loginClass: "",
    userClass: ""})
  }

  setFeaturesActive = () => {
    this.setState({homeClass: "",
    featureClass: "active",
    languageClass: "",
    signupClass: "",
    loginClass: "",
    userClass: ""})
  }

  setLanguagesActive = () => {
    this.setState({
      homeClass: "",
      featureClass: "",
      languageClass: "active",
      signupClass: "",
      loginClass: "",
      userClass: ""
    })
  }

  setSignupActive = () => {
    this.setState({
      homeClass: "",
      featureClass: "",
      languageClass: "",
      signupClass: "active",
      loginClass: "",
      userClass: ""
    })
  }

  setLoginActive = () => {
    this.setState({
      homeClass: "",
      featureClass: "",
      languageClass: "",
      signupClass: "",
      loginClass: "active",
      userClass: ""
    })
  }

  setUserActive = () => {
    this.setState({
      homeClass: "",
      featureClass: "",
      languageClass: "",
      signupClass: "",
      loginClass: "",
      userClass: "active"
    })
  }

  



  render(){
    return(
      <nav>
        <ul>
          <li onClick={this.setHomeActive} className={this.state.homeClass}><Link to="/">Home</Link></li>
          <li onClick={this.setFeaturesActive} className={this.state.featureClass}><Link to="/features">Features</Link></li>
          <li onClick={this.setLanguagesActive} className={this.state.languageClass}><Link to="/languages">Languages</Link></li>
          {window.localStorage.getItem("token") ? null : <li onClick={this.setSignupActive} className={this.state.signupClass} id="signup"><Link to ="/signup">Sign up</Link></li>}
          {window.localStorage.getItem("token") ? null : <li onClick={this.setLoginActive} className={this.state.loginClass} id="login"><Link to ="/login">Log in</Link></li>}
          {window.localStorage.getItem("token") ? <li onClick={this.setUserActive} className={this.state.userClass}><Link to={`/users/${window.localStorage.getItem("id")}`}>{this.state.username}</Link></li> : null}
          {window.localStorage.getItem("token") ? <li onClick={this.setHomeActive} id="logout"><Link onClick={this.handleLogout} to="/">Log out</Link></li> : null}
        </ul>
      </nav>
    )
  }

}
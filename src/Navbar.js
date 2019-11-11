import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
  constructor(){
    super();
    this.state = {
      username: window.localStorage.getItem("username") ? window.localStorage.getItem("username") : ""
    }
  }

  handleLogout = () => {
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("username")
    window.localStorage.removeItem("id")
    this.setState({username: ""})
  }


  render(){
    return(
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/features">Features</Link></li>
          <li><Link to="/languages">Languages</Link></li>
          <li className="right"><Link to ="/signup">Sign up</Link></li>
          <li className="right"><Link to ="/login">Log in</Link></li>
          {window.localStorage.getItem("token") ? <li><Link to={`/users/${window.localStorage.getItem("id")}`}>{this.state.username}</Link></li> : null}
          <li className="right"><Link onClick={this.handleLogout} to="/">Log out</Link></li>
        </ul>
      </nav>
    )
  }

}
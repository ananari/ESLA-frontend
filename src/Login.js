import React, {Component} from 'react';

const loginURL = "http://localhost:3000/login"
const postObj = {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "accept": "application/json"
  }
}

export default class Login extends Component {
  constructor(){
    super();
    this.state = {
      username: "",
      password: "",
      error: ""
    }
  }

  handleChange = event => {
    event.persist();
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault();
    postObj["body"] = JSON.stringify(this.state);
    fetch(loginURL, postObj)
    .then(res => res.json())
    .then(json => {
      if(!json.hasOwnProperty("error")){
        window.localStorage.setItem("token", json.jwt)
        window.localStorage.setItem("username", json.jwt.username)
        window.localStorage.setItem("id", `${json.jwt.id}`)
        window.location.assign("http://localhost:3001")
      }
      else {
        this.setState({error: json.error});
      }
    })
    .then(error => console.log(error))
  }

  render(){
    return (
      <div>
        <form onSubmit={event => this.handleSubmit(event)}>
          <input type="text" name="username" onChange={event => this.handleChange(event)} value={this.state.username} placeholder="Username" />
          <label>Username</label>
          <br/>
          <input type="password" name="password" onChange={event => this.handleChange(event)} value={this.state.password} placeholder="Password"/>
          <label>Password</label>
          <br/>
          <input type="submit" value="Sign up" />
        </form>
        <ul>
        {this.state.error.length > 0 ? <p>{this.state.error}</p> : null}
        </ul>
      </div>
    )
  }
}
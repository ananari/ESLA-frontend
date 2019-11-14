import React, {Component} from 'react';

const loginURL = "https://stark-lake-66426.herokuapp.com/login"
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
        window.localStorage.setItem("username", json.user.username)
        window.localStorage.setItem("id", `${json.user.id}`)
        window.location.assign("https://arcane-badlands-21974.herokuapp.com/")
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
        <form className="narrowUserForm" onSubmit={event => this.handleSubmit(event)}>
          <div className="form-group narrowUserForm row">
            <label>Username</label>
            <input type="text" name="username" className="col-6" onChange={event => this.handleChange(event)} value={this.state.username} placeholder="Username" />
          </div>
          <div className="form-group narrowUserForm row">
            <label>Password</label>
            <input type="password" name="password" className="col-6" onChange={event => this.handleChange(event)} value={this.state.password} placeholder="Password"/>
          </div>
          <div className="loginBtn">
            <input type="submit" className="btn btn-info" value="Log in" />
          </div>
        </form>
        <ul>
        {this.state.error.length > 0 ? <p>{this.state.error}</p> : null}
        </ul>
      </div>
    )
  }
}
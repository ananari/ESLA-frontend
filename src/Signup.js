import React, {Component} from 'react';

const usersURL = "http://localhost:3000/users"
const postObj = {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "accept": "application/json"
  }
}

export default class Signup extends Component {
  constructor(){
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      affiliation: "",
      age: "",
      error: ""
    }
  }

  handleChange = event => {
    event.persist();
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault();
    if(this.state.password === this.state.password_confirmation){
      postObj.body = JSON.stringify(this.state);
      fetch(usersURL, postObj)
      .then(res => res.json())
      .then(json => {
        if(!json.hasOwnProperty("error")){
          window.location.assign("http://localhost:3001/login")
        }
        else {
          this.setState({error: json.error});
        }
      })
      .catch(error => console.log(error))
    }
    else {
      this.setState({error: "password and password confirmation don't match"})
    }
  }
  

  render(){
    return(
      <div>
        <form onSubmit={event => this.handleSubmit(event)}>
          <input type="text" name="username" onChange={event => this.handleChange(event)} value={this.state.username} placeholder="Username" />
          <label>Username</label>
          <br/>
          <input type="text" name="email" onChange={event => this.handleChange(event)} value={this.state.email} placeholder="E-mail" />
          <label>E-mail</label>
          <br/>
          <input type="text" name="affiliation" onChange={event => this.handleChange(event)} value={this.state.affiliation} placeholder="Affiliation"/>
          <label>Affiliation</label>
          <br/>
          <input type="number" name="age" onChange={event => this.handleChange(event)} value={this.state.age} placeholder="Age"/>
          <label>Age</label>
          <br/>
          <input type="password" name="password" onChange={event => this.handleChange(event)} value={this.state.password} placeholder="Password"/>
          <label>Password</label>
          <br/>
          <input type="password" name="password_confirmation" placeholder="Password confirmation" value={this.state.password_confirmation} onChange={event => this.handleChange(event)} />
          <label>Password confirmation</label>
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

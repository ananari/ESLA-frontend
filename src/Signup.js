import React, {Component} from 'react';

const usersURL = "https://stark-lake-66426.herokuapp.com/users"
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
          window.location.assign("https://rocky-brushlands-87054.herokuapp.com/login")
        }
        else {
          this.setState({error: json.error});
        }
      })
      .catch(error => console.log(error))
    }
    else {
      this.setState({error: "Password and password confirmation don't match."})
    }
  }
  

  render(){
    return(
      <div>
        <form className="narrowUserForm" onSubmit={event => this.handleSubmit(event)}>
          <div className="form-group narrowUserForm row">
            <label>Username</label>
            <input type="text" name="username" className="col-6" onChange={event => this.handleChange(event)} value={this.state.username} placeholder="Username" />
          </div>
          <div className="form-group narrowUserForm row">
            <label>E-mail</label>
            <input type="text" name="email" className="col-6" onChange={event => this.handleChange(event)} value={this.state.email} placeholder="E-mail" />
          </div>
          <div className="form-group narrowUserForm row">
            <label>Affiliation</label>
            <input type="text" name="affiliation" className="col-6" onChange={event => this.handleChange(event)} value={this.state.affiliation} placeholder="Affiliation"/>
          </div>
          <div className="form-group narrowUserForm row">
            <label>Age</label>
            <input type="number" name="age"  className="col-6" onChange={event => this.handleChange(event)} value={this.state.age} placeholder="Age"/>
          </div>
          <div className="form-group narrowUserForm row">
            <label>Password</label>
            <input type="password" name="password" className="col-6" onChange={event => this.handleChange(event)} value={this.state.password} placeholder="Password"/>
          </div>
          <div className="form-group narrowUserForm row">
            <label>Password confirmation</label>
            <input type="password" name="password_confirmation" className="col-6" placeholder="Password confirmation" value={this.state.password_confirmation} onChange={event => this.handleChange(event)} />
          </div>
          <div className="signupBtn">
            <input type="submit" className="btn btn-info" value="Sign up" />
          </div>
        </form>
        <ul>
        {this.state.error.length > 0 ? <p>{this.state.error}</p> : null}
        </ul>
      </div>
    )
  }
}

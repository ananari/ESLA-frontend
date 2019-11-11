import React, {Component} from 'react';

const userURL = id => `http://localhost:3000/users/${id}`

export default class UserForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: this.props.user.username,
      email: this.props.user.email,
      affiliation: this.props.user.affiliation,
      age: this.props.user.age
    }
  }

  handleChange = (event) => {
    event.persist();
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let patchObj = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "accept": "application/json",
        "Authorization": `Bearer ${window.localStorage.getItem("token")}`
      },
      body: JSON.stringify(this.state)
    }
    fetch(userURL(this.props.user.id),patchObj)
    .then(res => res.json())
    .then(json => {
      console.log(json)
    })
    .catch(error => console.log(error))
  }

  render(){
    return(
      <div>
        <form onSubmit={event => this.handleSubmit(event)}> 
          <label>Username</label>
          <input type="text" name="username" onChange={event => this.handleChange(event)} value={this.state.username} />
          <br />
          <label>E-mail address</label>
          <input type="text" name="email" onChange={event => this.handleChange(event)} value={this.state.email} />
          <br />
          <label>Affiliation</label>
          <input type="text" name="affiliation" onChange={event => this.handleChange(event)} value={this.state.affiliation} />
          <br />
          <label>Age</label>
          <input type="number" name="age" onChange={event => this.handleChange(event)} value={this.state.age} />
          <br />
          <input type="submit" value="Edit" />
        </form>
      </div>
    )
  }
}
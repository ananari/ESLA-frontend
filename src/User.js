import React, {Component} from 'react';
import UserForm from './UserForm.js'

const userURL = id => `http://localhost:3000/users/${id}`

export default class User extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      email: "",
      affiliation: "",
      age: "",
      showUserForm: false
    }
  }


  componentDidMount(){
    fetch(userURL(this.props.id))
    .then(res => res.json())
    .then(json => {
      this.setState(json)
    })
  }

  toggleUserForm = () => {
    this.setState({showUserForm: !this.state.showUserForm})
  }


  render(){
    return (
    <div>
      <h1>{this.state.username}</h1>
      <h2>{this.state.email}</h2>
      <h3>{this.state.affiliation}</h3>
      <h4>{this.state.age}</h4>
      <br />
      {window.localStorage.getItem("id") === `${this.props.id}` ? <button onClick={this.toggleUserForm}>{this.state.showUserForm ? "Hide form" : "Edit information"}</button> : null}
      {this.state.showUserForm ? <UserForm user={this.state}/> : null }
    </div>)
  }
}
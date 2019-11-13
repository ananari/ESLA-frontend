import React, {Component} from 'react';
import UserForm from './UserForm.js'
import UserPasswordForm from './UserPasswordForm.js'

const userURL = id => `https://stark-lake-66426.herokuapp.com/users/${id}`

export default class User extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      email: "",
      affiliation: "",
      age: "",
      id: window.location.pathname.split('/users/')[1],
      showUserForm: false,
      showPasswordForm: false
    }
  }


  componentDidMount(){
    fetch(userURL(window.location.pathname.split('/users/')[1]))
    .then(res => res.json())
    .then(json => {
      this.setState(json)
    })
  }

  toggleUserForm = () => {
    this.setState({showUserForm: !this.state.showUserForm})
  }

  togglePasswordForm = () => {
    this.setState({showPasswordForm: !this.state.showPasswordForm})
  }

  hideUserForm = () => {
    this.setState({showUserForm: false})
  }

  hidePasswordForm = () => {
    this.setState({showPasswordForm: false})
  }

  updateUser = data => {
    this.setState(data)
  }

  


  render(){
    return (
    <div className="userInfo">
      <table>
        <tbody>
          <tr>
            <td>Username</td>
            <td>{this.state.username}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{this.state.email}</td>
          </tr>
          <tr>
            <td>Affiliation</td>
            <td>{this.state.affiliation}</td>
          </tr>
        </tbody>
      </table>
      <br />
      {window.localStorage.getItem("id") === `${window.location.pathname.split('/users/')[1]}` ? 
      <div className="editUserBtn">
        <button className="btn btn-info" onClick={this.toggleUserForm}>{this.state.showUserForm ? "Hide form" : "Edit information"}</button>
        <div className="divider" />
        <button id="changePassword" className="btn btn-info" onClick={this.togglePasswordForm}>{this.state.showPasswordForm ? "Hide form" : "Change password"}</button>
      </div>
       : null}

      {this.state.showUserForm ? <UserForm hideUserForm={this.hideUserForm} updateUser={this.updateUser} user={this.state}/> : null }
      {this.state.showPasswordForm ? <UserPasswordForm hidePasswordForm={this.hidePasswordForm} user={this.state}/> : null }
    </div>)
  }
}
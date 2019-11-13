import React, {Component} from 'react';

const userURL = id => `https://stark-lake-66426.herokuapp.com/users/${id}`;

export default class UserForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: this.props.user.username,
      email: this.props.user.email,
      affiliation: this.props.user.affiliation
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
      this.props.updateUser({
        username: json.username,
        email: json.email,
        affiliation: json.affiliation
      })
      this.props.hideUserForm()

    })
    .catch(error => console.log(error))
  }

  render(){
    return(
      <div>
        <form className="userForm" onSubmit={event => this.handleSubmit(event)}> 
          <div className="form-group userForm row">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" className="col-6" id="username" onChange={event => this.handleChange(event)} value={this.state.username} />
          </div>
          <div className="form-group userForm row">
            <label htmlFor="email">E-mail address</label>
            <input type="text" name="email" className="col-6" id="email" onChange={event => this.handleChange(event)} value={this.state.email} />
          </div>
          <div className="form-group userForm row">
            <label htmlFor="affiliation">Affiliation</label>
            <input type="text" name="affiliation" className="col-6" id="affiliation" onChange={event => this.handleChange(event)} value={this.state.affiliation} />
          </div>
          <div className="editUserBtn">
            <input type="submit" className="btn btn-info" value="Edit" />
          </div>
        </form>
      </div>
    )
  }
}
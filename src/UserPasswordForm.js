import React, {Component} from 'react';

const passURL = id => `http://localhost:3000/users/${id}/update_password`

export default class UserPasswordForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      password: "",
      new_password: "",
      new_password_confirmation: "",
      error: ""
    }
  }

  handleChange = event => {
    event.persist();
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault();
    const patchObj = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "accept": "application/json",
        "Authorization": `Bearer ${window.localStorage.getItem("token")}`
      },
      body: JSON.stringify(this.state)
    }
    if(this.state.new_password === this.state.new_password_confirmation) {
      fetch(passURL(this.props.user.id), patchObj)
      .then(res => res.json())
      .then(json => {
        if(!json.hasOwnProperty("error")) {
          window.localStorage.removeItem("token")
          window.localStorage.removeItem("username")
          window.localStorage.removeItem("id")
          window.location.assign("http://localhost:3001/login")
        }
        else {
          this.setState({error: json.error})
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
        <form className="userForm" onSubmit={event => this.handleSubmit(event)}> 
          <div className="form-group userForm row">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" className="col-6" id="password" onChange={event => this.handleChange(event)} value={this.state.password} />
          </div>
          <div className="form-group userForm row">
            <label htmlFor="new_password">New password</label>
            <input type="password" name="new_password" className="col-6" id="new_password" onChange={event => this.handleChange(event)} value={this.state.new_password} />
          </div>
          <div className="form-group userForm row">
            <label htmlFor="new_password_confirmation">Confirm new password</label>
            <input type="password" name="new_password_confirmation" className="col-6" id="new_password_confirmationn" onChange={event => this.handleChange(event)} value={this.state.new_password_confirmation} />
          </div>
          <div className="editUserBtn">
            <input type="submit" className="btn btn-info" value="Change password" />
          </div>
        </form>
        {this.state.error.length > 0 ? <p>{this.state.error}</p> : null}
      </div>
    )
  }
}
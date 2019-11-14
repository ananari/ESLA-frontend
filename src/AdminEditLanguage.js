import React, { Component } from 'react';

const languageURL = iso => `https://stark-lake-66426.herokuapp.com/languages/${iso}`


export default class AdminEditLanguage extends Component {
  constructor(){
    super();
    this.state = {
      iso: "",
      latitude: "",
      longitude: ""
    }
  }
  handleSubmit = event => {
    event.preventDefault();
    const patchObj={
      method: "PATCH",
      headers: {
      "content-type": "application/json",
      "accept": "application/json",
      "Authorization": `Bearer ${window.localStorage.getItem("token")}`
      },
      body: JSON.stringify(this.state)
    }
    fetch(datapointsURL, postObj)
    .then(res => res.json())
    .then(json => {
      if(!json.hasOwnProperty("error")){
        console.log(json)
      }
      else{
        this.setState({error: json.error})
      }
    })
  }

  handleChange = event => {
    event.persist();
    this.setState({[event.target.name]: event.target.value})
  }
  render(){
    return(
      <div>
        <form onSubmit={event => this.handleSubmit(event)}>
          <label>language</label>
          <input type="number" name="language_id" onChange={event => this.handleChange(event)} value={this.state.language_id} />
          <br/>
          <label>feature</label>
          <input type="number" name="feature_id" onChange={event => this.handleChange(event)} value={this.state.feature_id} />
          <br/>
          <label>value</label>
          <input type="text" name="value" onChange={event => this.handleChange(event)} value={this.state.value}/>
          <br />
          <input type="submit" value="sumbit"/>
        </form>
        {window.localStorage.getItem("token") ? <p>ur logged in</p> : <p>pls log in</p>}
        <p>{this.state.error}</p>
      </div>
    )
  }
}
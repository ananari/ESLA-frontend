import React, { Component } from 'react';
import MapContainer from './MapContainer.js'

const languageURL = iso => `http://localhost:3000/languages/${iso}`;

export default class Language extends Component {
  constructor(){
    super();
    this.state = {
      language: {},
      error: "oops"
    }
  }
  componentDidMount(){
    fetch(languageURL(window.location.pathname.split('/languages/')[1]))
    .then(res => res.json())
    .then(json => {
      this.setState({language: json})
    })
    .catch(error => this.setState({error: "Feature not found."}))

  }
  render(){
    if(Object.keys(this.state.language).length === 0){
      return(
        <h1>{this.state.error}</h1>
      )
    }
    else {
      return(
        <div>
          <h1>{this.state.language.name}</h1>
          <h2>{this.state.language.iso}</h2>
          {/* <MapContainer language={this.state.language}/> */}
        </div>
      )
    }
  }
}
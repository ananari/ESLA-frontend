import React, {Component} from 'react';
import Home from './Home.js';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const LanguagesURL = "http://localhost:3000/languages"

export default class LanguagesList extends Component {
  constructor(){
    super();
    this.state = {
      languages: []
    }
  }
  componentDidMount(){
    fetch(LanguagesURL)
    .then(res => res.json())
    .then(json => {
      this.setState({languages: json})
    })
    .catch(error => console.log(error))
  }
  render(){
    if(this.state.languages.length > 0) {
      return(
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>ISO 639-3 code</th>
            </tr>
          </thead>
          <tbody>
            {this.state.languages.map(language => {return(
              <tr key={language.id}>
                <td>{language.name}</td>
                <td>{language.iso}</td>
              </tr>
            )})}
          </tbody>
        </table>
      )
    }
    else {
      return(<p>Oops! No languages here.</p>)
    }
  }
}
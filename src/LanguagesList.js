import React, {Component} from 'react';
import { Link } from "react-router-dom";

const LanguagesURL = "https://stark-lake-66426.herokuapp.com/languages"

export default class LanguagesList extends Component {
  constructor(){
    super();
    this.state = {
      languages: [],
      visibleLanguages: [],
      name: "",
      iso: ""
    }
  }

  handleChange = async event => {
    event.persist();
    await this.setState({[event.target.name]: event.target.value})
    let visibleLanguages = this.state.languages.filter(lang => lang.name.toLowerCase().includes(this.state.name.toLowerCase()) && lang.iso.toLowerCase().includes(this.state.iso.toLowerCase()))
    this.setState({visibleLanguages: visibleLanguages})
  }
  componentDidMount(){
    fetch(LanguagesURL)
    .then(res => res.json())
    .then(json => {
      this.setState({languages: json, visibleLanguages: json})
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
            <tr>
              <th>
                <form>
                  <input type="text" onChange={event => this.handleChange(event)} name="name" value={this.state.name} />
                </form>
              </th>
              <th>
                <form>
                  <input type="text" onChange={event => this.handleChange(event)} name="iso" value={this.state.iso} />
                </form>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.visibleLanguages.map(language => {return(
              <tr key={language.id}>
                <td><Link to={`/languages/${language.iso}`}>{language.name}</Link></td>
                <td>{language.iso}</td>
              </tr>
            )})}
          </tbody>
        </table>
      )
    }
    else {
      return(<p>Oops! No languages here. Perhaps try to wait a bit to see if languages load?</p>)
    }
  }
}
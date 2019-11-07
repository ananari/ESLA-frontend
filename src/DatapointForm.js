import React, {Component} from 'react';

const languagesURL = "http://localhost:3000/languages";
const valuesURL = id => `http://localhost:3000/features/${id}/values`;
const datapointsURL = "http://localhost:3000/datapoints";
const editDatapointsURL = id => `http://localhost:3000/datapoints/${id}`;

export default class DatapointForm extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      language_id: this.props.currentlyEdited ? this.props.currentlyEdited.language_id : "",
      value: this.props.currentlyEdited ? this.props.currentlyEdited.value : "",
      values: [],
      languages: []
    }
  }

  componentDidMount(){
    fetch(languagesURL)
    .then(res => res.json())
    .then(json => {
      this.setState({languages: json})
    })
    .catch(error => console.log(error))

    fetch(valuesURL(this.props.featureID))
    .then(res => res.json())
    .then(json => {
      this.setState({values: json})
    })
    .catch(error => console.log(error))
  }

  handleSubmit = event => {
    let body = {
      language_id: this.state.language_id,
      value: this.state.value,
      feature_id: this.props.featureID,
      user_id: window.localStorage.getItem("id")
    };
    event.preventDefault();
    let configObj = {
      method: this.props.method,
      headers: {
        "content-type": "application/json",
        "accept": "application/json",
        "Authorization": `Bearer ${window.localStorage.getItem("token")}`
      },
      body: JSON.stringify(body)
    }
    let fetchURL = this.props.currentlyEdited ? editDatapointsURL(this.props.currentlyEdited.id) : datapointsURL
    fetch(fetchURL, configObj)
    .then(res => res.json())
    .then(json => {
      if(!json.hasOwnProperty('error')){
        console.log("a response has been successfully obtained")
        this.props.handleData(json);
        this.props.hideForm();
      }
    })
    .catch(error => console.log(error))
  }

  handleChange = event => {
    event.persist();
    this.setState({[event.target.name]: event.target.value})
  }

  componentDidUpdate(){
    console.log(this.props)
  }
  
  render(){
    if(this.state.values.length > 0 && this.state.languages.length > 0){
      return(
        <div>
          <h2>{this.props.currentlyEdited ? `Editing value ${this.props.currentlyEdited.value} for ${this.props.currentlyEdited.language.name}` : "Adding new datapoint"}</h2>
          <form onSubmit={(event) => this.handleSubmit(event)} >
            <label>Language</label>
            <select name="language_id" onChange={(event) => this.handleChange(event)} value={this.state.language_id}>
              <option value=""></option>
              {this.state.languages.map(lang => {return(<option value={lang.id}>{lang.name}</option>)})}
            </select>
            <br/>
            <label>Value</label>
            <select name="value" onChange={(event) => this.handleChange(event)} value={this.state.value}>
              <option value=""></option>
              {this.state.values.map(val => {return(<option value={val}>{val}</option>)})}
            </select>
            <br/>
            <input type="submit" value="Add datapoint" />
          </form>
        </div>
      )
    }
    else {
      return(
        <p>Oops, no form.</p>
      )
    }
  }
}
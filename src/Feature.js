import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const featureURL = id => `http://localhost:3000/features/${id}`;
const getDataURL = id => `http://localhost:3000/datapoints/for_feature/${id}`

export default class Feature extends Component {
  constructor(){
    super();
    this.state = {
      feature: {},
      datapoints: [],
      error: ""
    }
  }
  componentDidMount(){
    fetch(featureURL(window.location.pathname.split('/features/')[1]))
    .then(res => res.json())
    .then(json => {
      this.setState({feature: json})
    })
    .catch(error => {this.setState({error: "Feature not found."})})

    fetch(getDataURL(window.location.pathname.split('/features/')[1]))
    .then(res => res.json())
    .then(json => {
      this.setState({datapoints: json})
    })
    .catch(error => console.log(error))

  }
  render(){
    if(Object.keys(this.state.feature).length === 0) {
      return(<h1>this.state.error</h1>)
    }
    else if(this.state.feature.datapoints.length === 0) {
      return(
        <div>
          {this.state.feature.name}
          <p>No data yet.</p>
        </div>
      )
    }
    else {
      return(
        <div>
          <h1>{this.state.feature.name}</h1>
          <table>
            <thead>
              <tr>
                <th>Language</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {this.state.datapoints.map(dp => {return(
                <tr>
                  <td>{dp.language.name}</td>
                  <td>{dp.value}</td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      )
    }
  }
}
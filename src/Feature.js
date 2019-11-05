import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DatapointsList from './DatapointsList.js';
import BarChart from './BarChart.js'


const featureURL = id => `http://localhost:3000/features/${id}`;


export default class Feature extends Component {
  constructor(){
    super();
    this.state = {
      feature: {},
      datapoints: [],
      error: ""
    }
  }
  countData = data => {
    let occs = {};
    for(let i of data) {
      if(!occs.hasOwnProperty(i.value)) {
        occs[i.value] = 1;
      }
      else {
        occs[i.value]++;
      }
    }
    return occs;
  }

  supplyData = data => {
    this.setState({datapoints: data})
  }
  componentDidMount(){
    fetch(featureURL(window.location.pathname.split('/features/')[1]))
    .then(res => res.json())
    .then(json => {
      this.setState({feature: json})
    })
    .catch(error => {this.setState({error: "Feature not found."})})
  }

  render(){
    if(Object.keys(this.state.feature).length === 0) {
      return(<h1>{this.state.error}</h1>)
    }
    else {
      return(
        <div ref="myDiv">
          <div ref="myTest"></div>
          <h1>{this.state.feature.name}</h1>
          <BarChart data={this.countData(this.state.datapoints)} />
          <DatapointsList feature={window.location.pathname.split('/features/')[1]} supplyData={this.supplyData} />
        </div>
      )
    }
  }
}
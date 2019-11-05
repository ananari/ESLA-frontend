import React, {Component} from 'react';
import Datapoint from './Datapoint.js';
import DatapointForm from './DatapointForm.js'

const getDataURL = id => `http://localhost:3000/datapoints/for_feature/${id}`

export default class DatapointsList extends Component {
  constructor(){
    super();
    this.state = {
      datapoints: [],
      showForm: false
    }
  }

  componentDidMount(){
    fetch(getDataURL(this.props.feature))
    .then(res => res.json())
    .then(json => {
      this.setState({datapoints: json});
      this.props.supplyData(json);
    })
    .catch(error => console.log(error))
  }

  handleClick = () => {
    this.setState({showForm: true})
  }

  addDataPoint = dp => {
    this.setState({datapoints: [...this.state.datapoints, dp]})
    this.props.supplyData(this.state.datapoints)
  }

  hideForm = () => {
    this.setState({showForm: false})
  }

  render(){
    if(this.state.datapoints.length > 0) {
      return(
        <div>
          <table>
            <thead>
              <tr>
                <th>Language</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {this.state.datapoints.map(dp => {return(
                <Datapoint datapoint={dp}/>
              )})}
            </tbody>
          </table>
          {window.localStorage.getItem("id") ? <button onClick={() => this.handleClick()}>Add a new datapoint</button> : null}
          {this.state.showForm ? <DatapointForm featureID={this.props.feature} addDataPoint={this.addDataPoint} hideForm={this.hideForm} /> : null}
        </div>
      )
    }
    else {
      return(
        <p>Oops, no data yet.</p>
      )
    }
  }

  
}
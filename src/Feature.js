import React, {Component} from 'react';
import DatapointsList from './DatapointsList.js';
import BarChart from './BarChart.js'
import FeatureMap from './FeatureMap.js'
import DatapointForm from './DatapointForm.js';


const featureURL = id => `https://stark-lake-66426.herokuapp.com/features/${id}`;
const getDataURL = id => `https://stark-lake-66426.herokuapp.com/datapoints/for_feature/${id}`


export default class Feature extends Component {
  constructor(){
    super();
    this.state = {
      feature: {},
      datapoints: [],
      showNewForm: false,
      showEditForm: false,
      currentlyEdited: {},
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

  setEdit = dp => {
    this.setState({
      showEditForm: true,
      currentlyEdited: dp
    })
  }

  addDataPoint = dp => {
    this.setState({datapoints: [...this.state.datapoints, dp]})
    console.log("datapoint has been added")
  }

  editDataPoint = input => {
    let newDps = [...this.state.datapoints];
    let index = newDps.findIndex(dp => dp.id===input.id)
    newDps[index] = input;
    this.setState({datapoints: [...newDps]})
  }

  supplyData = data => {
    this.setState({datapoints: data})
    console.log("data has been supplied")
  }

  showNewForm = () => {
    this.setState({showNewForm: !this.state.showNewForm})
  }

  hideNewForm = () => {
    this.setState({showNewForm: false})
  }

  showEditForm = () => {
    this.setState({showEditForm: true})
  }

  hideEditForm = () => {
    this.setState({showEditForm: false})
  }

  componentDidMount(){
    fetch(featureURL(window.location.pathname.split('/features/')[1]))
    .then(res => res.json())
    .then(json => {
      this.setState({feature: json})
    })
    .catch(error => {this.setState({error: "Feature not found."})})
    console.log(this.state)

    fetch(getDataURL(window.location.pathname.split('/features/')[1]))
    .then(res => res.json())
    .then(json => {
      this.setState({datapoints: json});
    })
    .catch(error => console.log(error))
    
  }
  componentDidUpdate(){
    console.log(this.state)
  }



  render(){
    if(Object.keys(this.state.feature).length === 0) {
      return(<h1>{this.state.error}</h1>)
    }
    else {
      return(
        <div className="container">
          <h1>{this.state.feature.name}</h1>
          <div className="row">
            <FeatureMap feature={this.state.feature} key={this.state.datapoints.length} datapoints={this.state.datapoints}/>
            <BarChart data={this.countData(this.state.datapoints)} />
          </div>
          <DatapointsList feature={window.location.pathname.split('/features/')[1]} datapoints={this.state.datapoints} supplyData={this.supplyData} setEdit={this.setEdit} />
          {window.localStorage.getItem("token") ? <div className="addDataBtn"><button className="btn btn-info" onClick={() => this.showNewForm()}>{this.state.showNewForm ? "Hide form" : "Add new datapoint"}</button></div> : null}
          {this.state.showNewForm ? <DatapointForm featureID={this.state.feature.id} handleData={this.addDataPoint} hideForm={this.hideNewForm} method="POST" /> : null}
          {this.state.showEditForm ? <DatapointForm featureID={this.state.feature.id} handleData={this.editDataPoint} currentlyEdited={this.state.currentlyEdited} hideForm={this.hideEditForm} method="PATCH" /> : null}
        </div>
      )
    }
  }
}
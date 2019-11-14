import React, {Component} from 'react';
import Datapoint from './Datapoint.js';


export default class DatapointsList extends Component {

  constructor(props){
    super(props);
    this.state = {
      datapoints: this.props.datapoints,
      visibleDatapoints: this.props.datapoints,
      language: "",
      value: ""
    }
  }

  handleChange = async event => {
    event.persist();
    await this.setState({[event.target.name]: event.target.value});
    let visibleDatapoints = this.props.datapoints.filter(dp => dp.language.name.toLowerCase().includes(this.state.language.toLowerCase()) && dp.value.toLowerCase().includes(this.state.value.toLowerCase()))
    this.setState({visibleDatapoints: visibleDatapoints})
  }

  componentDidMount(){
    console.log("im mount")
    console.log({props: this.props})
  }

  render(){
    if(this.props.datapoints.length > 0) {
      return(
        <div>
          <table>
            <thead>
              <tr>
                <th>Language</th>
                <th>Value</th>
              </tr>
              <tr>
                <th>
                  <form>
                    <input type="text" onChange={event => this.handleChange(event)} name="language" value={this.state.language} />
                  </form>
                </th>
                <th>
                  <form>
                    <input type="text" onChange={event => this.handleChange(event)} name="value" value={this.state.value} />
                  </form>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.visibleDatapoints.map(dp => {return(
                  <Datapoint datapoint={dp} setEdit={this.props.setEdit}/>
                )})}
            </tbody>
          </table>
          
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
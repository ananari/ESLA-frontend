import React, {Component} from 'react';
import Datapoint from './Datapoint.js';


export default class DatapointsList extends Component {

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
            </thead>
            <tbody>
              {this.props.datapoints.map(dp => {return(
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
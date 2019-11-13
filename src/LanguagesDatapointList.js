import React, {Component} from 'react';
import LanguageDatapoint from './LanguageDatapoint.js'

const getDataURL = id => `https://stark-lake-66426.herokuapp.com/datapoints/for_language/${id}`

export default class LanguagesDatapointList extends Component {
  constructor(){
    super();
    this.state = {
      datapoints: [],
      showForm: false
    }
  }

  componentDidMount(){
    fetch(getDataURL(this.props.language.id))
    .then(res => res.json())
    .then(json => {
      this.setState({datapoints: json});
    })
    .catch(error => console.log(error))
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
                <LanguageDatapoint datapoint={dp}/>
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
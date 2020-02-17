import React, {Component} from 'react';
import LanguageDatapoint from './LanguageDatapoint.js'

const getDataURL = id => `https://stark-lake-66426.herokuapp.com/datapoints/for_language/${id}`

export default class LanguagesDatapointList extends Component {
  constructor(){
    super();
    this.state = {
      datapoints: [],
      visibleDatapoints: [],
      feature: "",
      value: ""
    }
  }

  componentDidMount(){
    fetch(getDataURL(this.props.language.id))
    .then(res => res.json())
    .then(json => {
      this.setState({datapoints: json, visibleDatapoints: json});
    })
    .catch(error => console.log(error))
  }

  handleChange = async event => {
    event.preventDefault();
    await this.setState({[event.target.name]: event.target.value})
    let visibleDatapoints = this.state.datapoints.filter(dp => dp.feature.name.toLowerCase().includes(this.state.feature.toLowerCase()) && dp.value.toLowerCase().includes(this.state.value.toLowerCase()))
    this.setState({visibleDatapoints})
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
              <tr>
                <th>
                  <form>
                    <input type="text" onChange={event => this.handleChange(event)} name="feature" value={this.state.feature} />
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
                <LanguageDatapoint datapoint={dp}/>
              )})}
            </tbody>
          </table>
        </div>
      )
    }
    else {
      return(
        <p>Oops, no data yet. Try waiting a bit to see if data loads?</p>
      )
    }
  }

  
}
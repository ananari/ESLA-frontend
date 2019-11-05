import React, {Component} from 'react';

export default class Datapoint extends Component {
  constructor(props){
    super(props);
    this.state = {
      showExamples: false
    }
  }
  render(){
    return (
      <tr>
        <td>{this.props.datapoint.language.name}</td>
        <td>{this.props.datapoint.value}</td>
        <button>Show examples</button>
      </tr>
    )
  }
}
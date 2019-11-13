import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class LanguageDatapoint extends Component {
  constructor(props){
    super(props);
    this.state = {
      showExamples: false
    }
  }
  render(){
    return (
      <tr>
        <td><Link to={`/features/${this.props.datapoint.feature.id}`}>{this.props.datapoint.feature.name}</Link></td>
        <td>{this.props.datapoint.value}</td>
      </tr>
    )
  }
}
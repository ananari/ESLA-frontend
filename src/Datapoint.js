import React, {Component} from 'react';
import { Link } from 'react-router-dom';

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
        <td><Link to={`/languages/${this.props.datapoint.language.iso}`}>{this.props.datapoint.language.name}</Link></td>
        <td>{this.props.datapoint.value}</td>
        <td>{`${this.props.datapoint.user_id}` === window.localStorage.getItem("id") ? <button onClick={() => this.props.setEdit(this.props.datapoint)}>Edit me</button> : null }</td>
      </tr>
    )
  }
}
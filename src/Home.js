import React, {Component} from 'react';

export default class Home extends Component {
  constructor(){
    super();
    this.state = {
      ip: ""
    }
  }

  componentDidMount(){
    fetch("https://stark-lake-66426.herokuapp.com/")
    .then(res => res.json())
    .then(json => {
      this.setState({ip: json["but where's here?"]})
    })
  }

  render(){
    return (
      <>
        <h1>Welcome to ESLA!</h1>
        <p>ESLA is a database of European sign languages based on grammatical properties. Your IP address is {this.state.ip}.</p>
      </>
    )
  }
}
import React, {Component} from 'react';
import black from './black.png'
import purple from './purple.png'
import blue from './blue.png'
import cyan from './cyan.png'
import green from './green.png'
import yellow from './yellow.png'
import orange from './orange.png'
import red from './red.png'
import pink from './pink.png'

export default class Marker extends Component {

  componentDidMount(){
    console.log(this.props.colour)
  }

  colourToSrc = colour => {
    const colourHash = {
      black: black,
      purple: purple,
      blue: blue,
      cyan: cyan,
      green: green,
      yellow: yellow,
      orange: orange,
      red: red,
      pink: pink
    }
    return(colourHash[colour])
  }

  render(){
    return(
      <div>
        <img alt={this.props.text} src={this.colourToSrc(this.props.colour)} />
        {this.props.text}
      </div>
    )
  }

  static defaultProps = {
    colour: "black",
    text: ""
  }
}

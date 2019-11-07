import React, {Component} from 'react';
import { Link } from "react-router-dom";

const FeaturesURL = "http://localhost:3000/features"

export default class FeaturesList extends Component {
  constructor(){
    super();
    this.state = {
      features: []
    }
  }
  componentDidMount(){
    fetch(FeaturesURL)
    .then(res => res.json())
    .then(json => {
      this.setState({features: json})
    })
    .catch(error => console.log(error))
  }

  

  render(){
    if(this.state.features.length > 0) {
      return(

          <div>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Domain</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.features.map(feature => {return(
                      <tr key={feature.id}>
                        <td><Link to={`/features/${feature.id}`}>{feature.name}</Link></td>
                        <td>{feature.domain}</td>
                      </tr>
                    )})}
                  </tbody>
                </table>


          </div>

      )
    }
    else {
      return(<p>Oops! No features here.</p>)
    }
  }
}
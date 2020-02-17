import React, {Component} from 'react';
import { Link } from "react-router-dom";

const FeaturesURL = "https://stark-lake-66426.herokuapp.com/features"

export default class FeaturesList extends Component {
  constructor(){
    super();
    this.state = {
      features: [],
      visibleFeatures: [],
      name: "",
      domain: ""
    }
  }
  componentDidMount(){
    fetch(FeaturesURL)
    .then(res => res.json())
    .then(json => {
      this.setState({features: json, visibleFeatures: json})
    })
    .catch(error => console.log(error))
  }

  handleChange = async event => {
    event.persist();
    await this.setState({[event.target.name]: event.target.value})
    let visibleFeatures = this.state.features.filter(feat => feat.name.toLowerCase().includes(this.state.name.toLowerCase()) && feat.domain.toLowerCase().includes(this.state.domain.toLowerCase()))
    this.setState({visibleFeatures: visibleFeatures})
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
                    <tr>
                      <th>
                        <form>
                          <input type="text" name="name" onChange={event => this.handleChange(event)} value={this.state.name} />
                        </form>
                      </th>
                      <th>
                        <form>
                          <input type="text" name="domain" onChange={event => this.handleChange(event)} value={this.state.domain} />
                        </form>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.visibleFeatures.map(feature => {return(
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
      return(<p>Oops! No features here. Maybe wait for a bit, to see if features are loading?</p>)
    }
  }
}
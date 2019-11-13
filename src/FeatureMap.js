import React, { Component} from 'react';
import GoogleMapReact from 'google-map-react';
import Legend from './Legend.js';
import Marker from './Marker.js'

const mapStyle = {
  width: '600px',
  height: '400px',
  margin: 'auto'
};
const mapCenter = [56.1371241, 17.8624636]
const mapZoom = 2

export default class FeatureMap extends Component {

  constructor(props){
    super(props);
    this.state = {
      features: [],
      vals: {}
    }
  }
  
  componentDidMount() {
    fetch(`https://stark-lake-66426.herokuapp.com/datapoints/for_feature/${this.props.feature.id}/geojson`)
    .then(res => res.json())
    .then(json => {
      this.setState({features: json.features, vals: json.values})
    })
  }

  componentDidUpdate(){
    console.log("featmap updated!")
    console.log(this.state)
    console.log(this.state.features)
    console.log(this.state.vals)
  }

  render(){
    if(this.state.features){
      return(
        <div>
          <div className="mapContainer center" style={mapStyle} id="mapContainer">
            <GoogleMapReact
                bootstrapURLKeys={{key: process.env.REACT_APP_API_KEY}}
                center={mapCenter}
                zoom={mapZoom}>
                  {this.state.features.map(feature => {return(<Marker lat={feature.latitude} lng={feature.longitude} colour={feature.icon}/>)})}
            </GoogleMapReact>
          </div>
          <Legend vals={this.state.vals} />
        </div>
      )
    }
    else {
      return(<p>Oops, no map here.</p>)
    }
  }

}
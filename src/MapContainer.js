import React, {Component} from 'react';
import Marker from './Marker.js'
import GoogleMapReact from 'google-map-react';


const mapStyle = {
  width: '600px',
  height: '400px',
  margin: 'auto'
};
const mapCenter = [56.1371241, 17.8624636]
const mapZoom = 2

export default class MapContainer extends Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="mapContainer" style={mapStyle}>
            <GoogleMapReact
            bootstrapURLKeys={{key: process.env.REACT_APP_API_KEY}}
            center={mapCenter}
            zoom={mapZoom}>
              <Marker
              lat={this.props.language.latitude}
              lng={this.props.language.longitude}
              text={this.props.language.name}
              />
            </GoogleMapReact>
          </div>
        </div>
      </div> 


    );
  }
}

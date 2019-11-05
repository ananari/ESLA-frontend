import React, {Component} from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyle = {
  width: '600px',
  height: '400px',
};

class MapContainer extends Component {
  render() {
    return (
        <Map
          google={this.props.google}
          zoom={3}
          style={mapStyle}
          initialCenter={{lat: 54.1371241, lng: 17.8624636}}
        >
          <Marker position={{lat: this.props.language.latitude, lng: this.props.language.longitude}}/>
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(MapContainer);
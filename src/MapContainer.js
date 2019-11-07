import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';

const mapStyle = {
  width: '600px',
  height: '400px'
};

export default class MapContainer extends Component {


  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [17.8624636, 56.1371241],
      zoom: 2
      });

    fetch(`http://localhost:3000/languages/${this.props.language.iso}/geojson`)
    .then(res => res.json())
    .then(json => {
      console.log(this.props.language.iso)
      console.log(json)
      map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Disc_Plain_black.svg/10px-Disc_Plain_black.svg.png',
       function (error, image) {
         map.addImage('black', image);
      })
      map.addLayer(json);

    })
    .catch(error => console.log(error))
      


  }
  render() {
    return (
        
      <div ref={el => this.mapContainer = el}  className="mapContainer" style={mapStyle}/>


    );
  }
}

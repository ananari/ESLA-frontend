import React, { Component} from 'react';
import mapboxgl from 'mapbox-gl';
import Legend from './Legend.js';

const mapStyle = {
  width: '600px',
  height: '400px'
};

export default class FeatureMap extends Component {

  constructor(props){
    super(props);
    this.state = {
      vals: {}
    }
  }
  
  componentDidMount() {
    fetch(`http://localhost:3000/datapoints/for_feature/${this.props.feature.id}/geojson`)
    .then(res => res.json())
    .then(json => {
      this.setState({vals: json.values})
    })
  }

  componentDidUpdate() {
    this.renderMap()
  }

  renderMap = () => {
    console.log("map rendering")
    document.getElementById("mapContainer").innerHTML="";
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [15, 54],
      zoom: 2.4
    });
    fetch(`http://localhost:3000/datapoints/for_feature/${this.props.feature.id}/geojson`)
    .then(res => res.json())
    .then(json => {
      console.log(json);
      map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Disc_Plain_purple.svg/10px-Disc_Plain_purple.svg.png',
        function (error, image) {
          map.addImage('purple', image);
      })
      map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Disc_Plain_blue.svg/10px-Disc_Plain_blue.svg.png',
        function (error, image) {
          map.addImage('blue', image);
      })
      
      map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Disc_Plain_cyan.svg/10px-Disc_Plain_cyan.svg.png',
        function (error, image) {
          map.addImage('cyan', image);
      })
      map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Disc_Plain_green_dark.svg/10px-Disc_Plain_green_dark.svg.png', 
        function (error, image) {
          map.addImage('green', image);
      })
      map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Disc_Plain_yellow.svg/10px-Disc_Plain_yellow.svg.png',
        function (error, image) {
          map.addImage('yellow', image);
      })
      map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Disc_Plain_orange.svg/10px-Disc_Plain_orange.svg.png', 
        function (error, image) {
          map.addImage('orange', image);
      })
      map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Disc_Plain_red.svg/10px-Disc_Plain_red.svg.png',
        function (error, image) {
          map.addImage('red', image);
      })
      map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Disc_Plain_black.svg/10px-Disc_Plain_black.svg.png',
        function (error, image) {
          map.addImage('black', image);
      })
      map.addLayer(json);

    })
    .catch(error => console.log(error))
    
  }

  
  render(){
    return(
      <div>
        <div ref={el => this.mapContainer = el}  className="mapContainer center" style={mapStyle} id="mapContainer">
        </div>
        <Legend vals={this.state.vals} />
      </div>
    )
  }

}

// app/javascript/controllers/ol_osm_map_controller.js
import { Controller } from "@hotwired/stimulus"
// import ol from 'openlayers/dist/ol.js' // 'ol-debug.js'
// import Map from 'ol/Map' // does not work. Errors and doesn't support new Map({})
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';

// Connects to data-controller="ol-osm-map"
export default class extends Controller {
  static targets = [ "maposm" ] // is for Stimulus

  connect() {
    this.map = new Map({
      target: 'maposm', // #map defined separately from Stimulus
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([-116, 34]),
        zoom: 7
      })
    });
  }

//  Not sure what this was supposed to do
  // disconnect(){
  //     this.map.remove()
  // }
}

// Does  this.map in more than one controller confuse
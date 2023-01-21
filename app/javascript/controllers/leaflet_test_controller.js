import { Controller } from "@hotwired/stimulus"
import L from "leaflet" // ie, the node_module
// import "leaflet-css"; // works in importmaps, but not with esbuild. Had to copy into app/assets/stylesheets and import in application.bootstrap.scss. Or link to it there.
// Connects to data-controller="leaflet"
export default class extends Controller {
  static targets = [ "leaftest" ] // is for Stimulus but not being used?
  static values = {
    lng: String,
    lat: String,
  }
  
  connect() {
   
   const cities = L.layerGroup();
   
   var lng = this.lngValue;
   var lat = this.latValue;
   
   // const mLittleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.').addTo(cities);
   const mLittleton = L.marker([lng, lat]).bindPopup('This is Littleton, CO.').addTo(cities);
   const mDenver =    L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.').addTo(cities);
   const mAurora =    L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.').addTo(cities);
   const mGolden =    L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.').addTo(cities);
   
   const mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
   const mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
   
   const streets = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr});
   
   const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
     maxZoom: 19,
     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
   });
   
   // not this.map with leaflet
   const map = L.map('mapll', {
     center: [39.73, -104.99],
     zoom: 10,
     layers: [osm, cities]
   });
   
   const baseLayers = {
     'OpenStreetMap': osm,
     'Streets': streets
   };
   
   const overlays = {
     'Cities': cities
   };
   
   const layerControl = L.control.layers(baseLayers, overlays).addTo(map);
   const crownHill = L.marker([39.75, -105.09]).bindPopup('This is Crown Hill Park.');
   const rubyHill = L.marker([39.68, -105.00]).bindPopup('This is Ruby Hill Park.');
   
   const parks = L.layerGroup([crownHill, rubyHill]);
   
   const satellite = L.tileLayer(mbUrl, {id: 'mapbox/satellite-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr});
   layerControl.addBaseLayer(satellite, 'Satellite');
   layerControl.addOverlay(parks, 'Parks');

  }
}

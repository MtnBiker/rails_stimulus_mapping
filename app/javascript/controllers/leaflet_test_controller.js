import { Controller } from "@hotwired/stimulus"
import L from "leaflet" // ie, the node_module
// import "leaflet-css"; // works in importmaps, but not with esbuild. Had to copy into app/assets/stylesheets and import in application.bootstrap.scss
// Connects to data-controller="leaflet"
export default class extends Controller {
  static targets = [ "leaflettest" ] // is for Stimulus
  
  connect() {
    var accessToken = 'pk.eyJ1IjoibXRuYmlrZXIiLCJhIjoiNmI5ZmZjMzAyNzJhY2Q0N2ZlN2E1ZTdkZjBiM2I1MTUifQ.6R3ptz9ejWpxcdZetLLRqg';
    var mapboxUrl = 'https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
   
    
    var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
        denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
        aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
        golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');

    var cities = L.layerGroup([littleton, denver, aurora, golden]);
    
    var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    });

    var streets = L.tileLayer(mapboxUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1});

    var map = L.map('mapll', {
        center: [39.73, -104.99],
        zoom: 10,
        layers: [osm, cities]
    });
    var baseMaps = {
        // "<span style='color: gray'>Grayscale</span>": grayscale,
        "Streets": streets
    };
    var baseMaps = {
        "OpenStreetMap": osm,
        "Mapbox Streets": streets
    };
    var overlayMaps = {
        "Cities": cities
    };
    var crownHill = L.marker([39.75, -105.09]).bindPopup('This is Crown Hill Park.'),
        rubyHill = L.marker([39.68, -105.00]).bindPopup('This is Ruby Hill Park.');
    
    var parks = L.layerGroup([crownHill, rubyHill]);
    var satellite = L.tileLayer(mapboxUrl, {id: 'MapID', tileSize: 512, zoomOffset: -1});

    layerControl.addBaseLayer(satellite, "Satellite");
    layerControl.addOverlay(parks, "Parks");
    
    var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
  }
}

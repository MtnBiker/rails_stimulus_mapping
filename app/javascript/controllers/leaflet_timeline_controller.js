import { Controller } from "@hotwired/stimulus"

import L from "leaflet"
// import timeline from "Timeline"
// import {timelineSliderControl} from "./src/TimelineSliderControl"
// console.log('5. leaflet_timeline_controller.js to confirm connecting.');
// Connects to data-controller="leaflet-timeline"
export default class extends Controller {
  static targets = [ "ltlmap" ] // is for Stimulus but not being used?
  connect() {
    console.log('9. leaflet_timeline_controller.js to confirm connecting.');
    // this.map = L.map('map', {center: [34.040951, -118.258579], zoom: 13});
    var rumseyLink = '<a href="http://www.davidrumsey.com">The David Rumsey Map Collection</a>';
    var bkmAttrib = '&copy; ' + rumseyLink;
    var bkmUrl = "https://crores.s3.amazonaws.com/tiles/bkm/{z}/{x}/{y}.png"
    var bkm = L.tileLayer(bkmUrl);
    // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
    this.map = L.map("ltlmap", {
      layers: [bkm],
      // center: new L.LatLng(34.052358, -118.243128),
      center: [34.052358, -118.243128],
      zoom: 13,
    });
    
    $.getJSON('public/line_data.geojson', function (data_data) { 
      var timelineData = L.timeline(data_data, {
        style: function (data_data) {
          return {
            stroke: true,
            fillOpacity: 0.5,
          };
        }, // end style: function(data_data)
        waitToUpdateMap: true,
        onEachFeature: function (data_data, layer) {
          layer.bindTooltip(data_data.properties.popup, {direction: 'top'});
        }, // onEachFeature:
      }); // end let timelineData = L.timeline
    
      var timelineControl = L.timelineSliderControl({
        enableKeyboardControls: true,
        steps: 100,
        start: 1879,
        end: 1928,
      });
      // console.log("46. CONSOLE LOG: timelineData: ", timelineData);
      timelineData.addTo(this.map); // without this the line don't show
      // what are the line above and below doing?
      timelineControl.addTo(this.map);
      timelineControl.addTimelines(timelineData);
      // console.log("51. CONSOLE LOG: timelineControl: ", timelineControl);
      // console.log("52. CONSOLE LOG: last line of $.getJSON. map: ", this.map);
    }); //  end $.getJSON
  } // connect
} // extends

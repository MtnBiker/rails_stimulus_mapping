// app/javascript/controllers/ol_layer_switcher_controller.js
import { Controller } from "@hotwired/stimulus"

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {Group as LayerGroup, Tile as TileLayer, Image as ImageLayer} from 'ol/layer.js';
import {OSM, XYZ, Stamen, ImageArcGISRest} from 'ol/source';
import Static from 'ol/source/ImageStatic.js';
import {Projection, fromLonLat, transform} from 'ol/proj.js';
import {getCenter} from 'ol/extent';
import LayerSwitcher from 'ol-layerswitcher/dist/ol-layerswitcher.js';

// Connects to data-controller="ol-layer-switcher"
export default class extends Controller {
  // static targets = [ "lsmap" ];

  connect() {
    console.log("20. Hi from ol_layer_switcher_controller to confirm that Stimulus controller is connected to the page."); 
      this.map = new Map({
        target: 'lsmap',
        layers: [
          new LayerGroup({
            // A layer must have a title to appear in the layerswitcher
            title: 'Base maps',
            layers: [
              new LayerGroup({
                // A layer must have a title to appear in the layerswitcher
                title: 'Water color with labels',
                // Setting the layers type to 'base' results
                // in it having a radio button and only one
                // base layer being visibile at a time
                type: 'base',
                // Setting combine to true causes sub-layers to be hidden
                // in the layerswitcher, only the parent is shown
                combine: true,
                visible: false,
                layers: [
                  new TileLayer({
                    source: new Stamen({
                      layer: 'watercolor'
                    })
                  }),
                  new TileLayer({
                    source: new Stamen({
                      layer: 'terrain-labels'
                    })
                  })
                ]
              }),
              new TileLayer({
                // A layer must have a title to appear in the layerswitcher
                title: 'Water color',
                // Again set this layer as a base layer
                type: 'base',
                visible: false,
                source: new Stamen({
                  layer: 'watercolor'
                })
              }),
              new TileLayer({
                // A layer must have a title to appear in the layerswitcher
                title: 'OSM',
                // Again set this layer as a base layer
                type: 'base',
                visible: true,
                source: new OSM()
              })
            ]
          }),
          new LayerGroup({
            // A layer must have a title to appear in the layerswitcher
            title: 'Overlays',
            // Adding a 'fold' property set to either 'open' or 'close' makes the group layer
            // collapsible
            fold: 'open',
            layers: [
              new ImageLayer({
                // A layer must have a title to appear in the layerswitcher
                title: 'Countries',
                source: new ImageArcGISRest({
                  ratio: 1,
                  params: { LAYERS: 'show:0' },
                  url:
                    'https://ons-inspire.esriuk.com/arcgis/rest/services/Administrative_Boundaries/Countries_December_2016_Boundaries/MapServer'
                })
              }),
              new LayerGroup({
                // A layer must have a title to appear in the layerswitcher
                title: 'Census',
                fold: 'open',
                layers: [
                  new ImageLayer({
                    // A layer must have a title to appear in the layerswitcher
                    title: 'Local Authority Districts December 2011 Boundaries',
                    source: new ImageArcGISRest({
                      ratio: 1,
                      params: { LAYERS: 'show:0' },
                      url:
                        'https://ons-inspire.esriuk.com/arcgis/rest/services/Census_Boundaries/Census_Merged_Local_Authority_Districts_December_2011_Boundaries/MapServer'
                    })
                  }),
                  new ImageLayer({
                    // A layer must have a title to appear in the layerswitcher
                    title: 'Wards',
                    visible: false,
                    source: new ImageArcGISRest({
                      ratio: 1,
                      params: { LAYERS: 'show:0' },
                      url:
                        'https://ons-inspire.esriuk.com/arcgis/rest/services/Census_Boundaries/Census_Merged_Wards_December_2011_Boundaries/MapServer'
                    })
                  })
                ]
              })
            ]
          })
        ],
        view: new View({
          center: transform([-0.92, 52.96], 'EPSG:4326', 'EPSG:3857'),
          zoom: 6
        })
      });
    
      var layerSwitcher = new LayerSwitcher({
        tipLabel: 'Légende', // Optional label for button
        groupSelectStyle: 'children' // Can be 'children' [default], 'group' or 'none'
      });
      this.map.addControl(layerSwitcher);
      
      // Now adding overlay data
      
      $.getJSON('line_data.geojson', function (data_data) { 
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

  }
}

// app/javascript/controllers/ol_layer_group_controller.js
import { Controller } from "@hotwired/stimulus"

import Map from 'ol/Map';
import View from 'ol/View';
import {ImageLayer, TileLayer, GroupLayer} from 'ol/layer/Image';
import {getCenter} from 'ol/extent';
import {OSM, XYZ, Static} from 'ol/source';
import {Projection, fromLonLat} from 'ol/proj';
import LayerSwitcher from 'ol-layerswitcher/dist/ol-layerswitcher.js';

// Connects to data-controller="ol-layer-group"
export default class extends Controller {
    static targets = [ "lgmap" ];

    connect(){
      console.log("20. Hi from ol_layer_group_controller to confirm that Stimulus controller is connected to the page."); // this shows up

      //  Copied but didn't used most of them
      var osmLink  = '<a href="https://openstreetmap.org">OpenStreetMap</a>',
        esriLink   = '<a href="https://www.esri.com/">Esri</a>',
        mbLink     = '<a href="https://mabbox.com/">OpenStreetMap</a>',
        locLink    = '<a href="https://www.loc.gov/collections/sanborn-maps/about-this-collection/">Library of Congress</a>',
        rumseyLink = '<a href="http://www.davidrumsey.com">The David Rumsey Map Collection</a>';

      // / URLs for the servers
      var osmUrl          = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        esriUrl           = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        hill1928url       = 'https://crores.s3.amazonaws.com/tiles/1928Hills/{z}/{x}/{y}.png',
        baistDetailurl    = 'https://crores.s3.amazonaws.com/tiles/baistDetail/{z}/{x}/{y}.png',
        baistKMurl        = 'https://crores.s3.amazonaws.com/tiles/bkm/{z}/{x}/{y}.png',
        rueger1902url     = 'https://crores.s3.amazonaws.com/tiles/1902rueger/{z}/{x}/{y}.png',
        gates1909url      = 'https://crores.s3.amazonaws.com/tiles/1909gates/{z}/{x}/{y}.png',
        woods1908url      = 'https://crores.s3.amazonaws.com/tiles/1908woods/{z}/{x}/{y}.png',
        hamlin1908url     = 'https://crores.s3.amazonaws.com/tiles/1908Hamlin/{z}/{x}/{y}.png',
        pierce1894url     = 'https://crores.s3.amazonaws.com/tiles/1894pierce/{z}/{x}/{y}.png',
        sanborn1894url    = 'https://crores.s3.amazonaws.com/tiles/1894Sanborn/{z}/{x}/{y}.png',
        sanborn1894KmUrl  = 'https://crores.s3.amazonaws.com/tiles/1894SanbornKeyMaps/{z}/{x}/{y}.png',
        sanborn1888url    = 'https://crores.s3.amazonaws.com/tiles/1888SanbornKM1a/{z}/{x}/{y}.png',
        stephenson1884url = 'https://crores.s3.amazonaws.com/tiles/1884stephenson/{z}/{x}/{y}.png';

      // Attribution using this also to label the map, better to have a title put above the map, so know which map I'm looking at
      var osmAttrib             = '&copy; ' + osmLink + ' Contributors',
        esriAttrib              = 'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community & ' + esriLink,
        mbAttrib                = '&copy;<a href="https://www.mapbox.com/map-feedback/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        mwAttrib                = 'https://thinkwhere.wordpress.com',
        wood1908Attrib          = ' 1908 Wood for Security Savings ' + rumseyLink,
        gates1909Attrib         = ' 1909 Gates Birdseye&mdash;Trial on one piece ',
        baistAttrib             = ' 1921 Baist&mdash;' + rumseyLink,
        loc1894Attrib           = ' 1894 Sanborn ' + locLink,
        csun1894Attrib          = ' 1894 Sanborn Key ',
        libraryOfCongressAttrib = ' 1894 Sanborn ' + locLink,
        csun1888Attrib          = ' 1888 Sanborn Key ';


      // One LayerGroup for base layers. Listed in reverse order of appearance in list
      var baseLayers = new GroupLayer({
        // A layer must have a title to appear in the layerswitcher
        title: 'Base maps—Historic and Current',
        layers: [
          // the first one is the group but also has the layer that appears last in the list
          // Base layers appear in the reverse of the order here
          new TileLayer({
            // A layer must have a title to appear in the layerswitcher
            title: '1884 Stephenson',
            // Again set this layer as a base layer
            type: 'base',
            visible: false,
            maxZoom: 17,
            source: new XYZ({
              attributions: '',
              url: stephenson1884url,
            }),
          }),
          new TileLayer({
            // A layer must have a title to appear in the layerswitcher
            title: '1888 Sanborn',
            // Again set this layer as a base layer
            type: 'base',
            visible: false,
            maxZoom: 19,
            source: new XYZ({
              attributions: '',
              url: sanborn1888url,
            }), // source
          }), //  1888 Sanborn TileLayer
          new TileLayer({
            // A layer must have a title to appear in the layerswitcher
            title: '1894 Pierce',
            // Again set this layer as a base layer
            type: 'base',
            visible: false,
            maxZoom: 19,
            source: new XYZ({
              attributions: '1894 Pierce',
              url: pierce1894url,
            }),
          }),
          new TileLayer({
            // A layer must have a title to appear in the layerswitcher
            title: '1894 Sanborn Detailed',
            // Again set this layer as a base layer
            type: 'base',
            visible: false,
            maxZoom: 20,
            source: new XYZ({
              attributions: loc1894Attrib,
              url: sanborn1894url,
            }),
          }),
          new TileLayer({
            // A layer must have a title to appear in the layerswitcher
            title: '1894 Sanborn Key',
            // Again set this layer as a base layer
            type: 'base',
            visible: false,
            maxZoom: 19,
            source: new XYZ({
              attributions: loc1894Attrib,
              url: sanborn1894KmUrl,
            }),
          }),
          new TileLayer({
            // A layer must have a title to appear in the layerswitcher
            title: '1902 Rueger',
            // Again set this layer as a base layer
            type: 'base',
            visible: false,
            maxZoom: 16,
            source: new XYZ({
              attributions: '',
              url: rueger1902url,
            }),
          }),
          new TileLayer({
            // A layer must have a title to appear in the layerswitcher
            title: '1908 Hamlin',
            // Again set this layer as a base layer
            type: 'base',
            visible: false,
            maxZoom: 18,
            source: new XYZ({
              attributions: '',
              url: hamlin1908url,
            }),
          }),
          new TileLayer({
            // A layer must have a title to appear in the layerswitcher
            title: '1908 Woods',
            // Again set this layer as a base layer
            type: 'base',
            visible: false,
            source: new XYZ({
              attributions: '',
              url: woods1908url,
            }),
          }),
          new TileLayer({
            // A layer must have a title to appear in the layerswitcher
            title: '1921 Baist Detailed',
            // Again set this layer as a base layer
            type: 'base',
            visible: false,
            // minZoom: 18, // visible at zoom levels above 14
            source: new XYZ({
              attributions: 'xxx from ' + '<a href="http://www.maptiler.com/">Baist Insurance Maps, 1921</a>',
              url: baistDetailurl,
            }),
          }),
          new TileLayer({
            // A layer must have a title to appear in the layerswitcher
            title: '1921 Baist Key',
            // Again set this layer as a base layer
            type: 'base',
            visible: false,
            // minZoom: 18, // visible at zoom levels above 14
            source: new XYZ({
              attributions: 'xxx from ' + '<a href="http://www.davidrumsey.com">The David Rumsey Map Collection</a>',
              url: baistKMurl,
            }),
          }),
          new TileLayer({
            // A layer must have a title to appear in the layerswitcher
            title: '1928 Hill', // Really comes from the Group
            // Again set this layer as a base layer
            type: 'base',
            visible: false,
            source: new XYZ({
              attributions: '',
              url: hill1928url,
            }),
          }),
          new TileLayer({
            // A layer must have a title to appear in the layerswitcher
            title: 'Satellite',
            // Again set this layer as a base layer
            type: 'base',
            visible: false,
            source: new XYZ({
              attributions: '',
              url: esriUrl,
            }),
          }),
          new TileLayer({
            // FIXME OSM should be a baselayer with the others on top with a fader for the overlays
            // A layer must have a title to appear in the layerswitcher
            title: 'OSM',
            // Again set this layer as a base layer
            type: 'base',
            visible: true,
            source: new OSM(),
          }),
        ], // line 93 layers [ . A bunch of TileLayer
      }); // var baseLayers

      var mapExtent = [-118.5, 34.0, -118.2, 33.7];

      // Two steps establishing layer so can reused vectorSource in timeline.

      // Just line date, but try line and point since want more info on rollover
      // var vectorLineSource = new VectorSource({
      //   url: 'map/line_data.geojson',
      //   projection: 'EPSG:3857',
      //   format: new GeoJSON(), // format: new ol.format.GeoJSON(),
      //   attributions: [ " <a href='./about'>CroRes</a>" ]
      // })
      // var vectorLineLayer = new VectorLayer({
      //   name: 'Where and when',
      //   // style: style(), // the style was making circles and blobs for earthquake data. Do I need style? Yes but will do with LinePoint
      //   source: vectorLineSource
      // });

      // Need both lines and point since point is the ends of the line
      // var vectorLinePointSource = new ol.source.vector({
      //   url: 'map/line_point_data.geojson',
      //   projection: 'EPSG:3857',
      //   format: new ol.format.GeoJSON(), // format: new ol.format.GeoJSON(),
      //   attributions: [ " <a href='./about'>CroRes</a>" ]
      // })
      // var vectorLinePointLayer = new ol.layer.vector({
      //   name: 'Where and when',
      //   style: style(),
      //   source: vectorLinePointSource
      // });

     this.map = new Map({
       //       this.map = new import_ol_debug.default.map({
          target: 'lgmap',
          // layers: [ baseLayers, vectorLinePointLayer ], since vectorLinePointLayer may not be defined in this trail
          layers: [ baseLayers ],
          view: new View({
            center: fromLonLat([-118.258579, 34.040951]),
            zoom: 14,
            maxZoom: 20,
            // extent: transformExtent(mapExtent, 'EPSG:4326', 'EPSG:3857'), // define mapExtent better or understand how this works. Or maybe my data is extending beyond the extent
            constrainOnlyCenter: true
          }) // end new ol.Map
      }); // end var map
      // The following needs base and overlay is ol.layerswitcher which has a problem
      var varLayerSwitcher = new LayerSwitcher({
          tipLabel: 'Legend', // Optional label for button and isn't seen
          groupSelectStyle: 'children' // Can be 'children' [default], 'group' or 'none'
      });
      this.map.addControl(varLayerSwitcher);
      
  } // connect
} // export

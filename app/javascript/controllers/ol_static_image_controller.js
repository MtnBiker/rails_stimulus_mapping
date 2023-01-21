import { Controller } from "@hotwired/stimulus"

import ImageLayer from 'ol/layer/Image';
import Map from 'ol/Map';
import Projection from 'ol/proj/Projection';
import Static from 'ol/source/ImageStatic';
import View from 'ol/View';
import {getCenter} from 'ol/extent';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';

// console.log("12. Hi from ol_static_image_controller"); // this shows up

// Connects to data-controller="ol-static-image"
export default class extends Controller {
  // static targets = [ "mapsi" ] // data-ol-static-image-target="simage"

  connect() {
    // Map views always need a projection.  Here we just want to map image
    // coordinates directly to map coordinates, so we create a projection that uses
    // the image extent in pixels.
   const extent = [0, 0, 1024, 968];
   const projection = new Projection({
     code: 'xkcd-image',
     units: 'pixels',
     extent: extent,
   });
   console.log("28. Hi from ol_static_image_controller");
   // const map = new Map({
   this.map = new Map({
     layers: [
       new ImageLayer({
         source: new Static({
           attributions: '© <a href="https://xkcd.com/license.html">xkcd</a>',
           url: 'https://imgs.xkcd.com/comics/online_communities.png',
           projection: projection,
           imageExtent: extent,
         }),
       }),
     ],
     target: 'mapsi',
     view: new View({
       projection: projection,
       center: getCenter(extent),
       zoom: 2,
       maxZoom: 8,
     }),
   });
  }
}

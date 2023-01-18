// This file is auto-generated by ./bin/rails stimulus:manifest:update
// Run that command whenever you add a new controller or create them with
// ./bin/rails generate stimulus controllerName

import { application } from "./application"

import HelloController from "./hello_controller"
application.register("hello", HelloController)

import LeafletTestController from "./leaflet_test_controller"
application.register("leaflet-test", LeafletTestController)

import OlLayerGroupController from "./ol_layer_group_controller"
application.register("ol-layer-group", OlLayerGroupController)

import OlOsmMapController from "./ol_osm_map_controller"
application.register("ol-osm-map", OlOsmMapController)

import OlStaticImageController from "./ol_static_image_controller"
application.register("ol-static-image", OlStaticImageController)

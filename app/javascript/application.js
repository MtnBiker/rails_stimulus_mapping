// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import * as bootstrap from "bootstrap"
import "./src/jquery-fix.js" // named such so don't confuse with jquery itself which is in node_modules
// https://gorails.com/episodes/how-to-use-jquery-with-esbuild?autoplay=1 Order of these four is important
// window variables assigned before jquery-ui called. Hoisting problem
import "./src/jquery-ui" // having the node_module version doesn't work because all of it is not available. 
import "./src/TimelineSliderControl.js"
import "./src/Timeline.js"


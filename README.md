See [app/views/demo/index.html.erb](https://rails-openlayers-leaflet.fly.dev) for more information.

➜ rails new os-stimulus-mapping --j esbuild --css bootstrap --database postgresql --skip-action-mailer --skip-action-mailbox --skip-action-cable

Better name would be rails-stimulus-mapping

Cleaner version of os-stimulus-esbuild which amounts to a first trial of this app

Tie to my railsvite db. Copied into database.yml, but not using. railsvite is an empty db (set up for another test) but that way the app has Postgres to match my app. localhost won't work without an existing db.

➜ yarn add ol
➜ yarn add ol-layerswitcher
➜ yarn add leaflet

➜ rails generate controller demo index
routes.rb root "demo#index"

`rails g stimulus ol-layer-group` to generate dummy stimulus controller and update javascript/controller/index.js, etc.

had to copy leaflet images to /public . assets/images doesn't work nor does /vendor.
Stopped working after a clear cache in chrome

➜ fly launch [rails-openlayers-leaflet]
➜ fly deploy [said no to db, even though is pg]
Failed, can't do `fly launch` again to reset, automatically try `fly deploy`
fly open
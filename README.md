➜ rails new os-stimulus-mapping --j esbuild --css bootstrap --database postgresql --skip-action-mailer --skip-action-mailbox --skip-action-cable

Better name would be rails-stimulus-mapping

Cleaner version of os-stimulus-esbuild which amounts to a first trial of this app

Tie to crores db. Copied into database.yml, but not using. Changed to railsvite since it's an empty db (set up for another test)

➜ yarn add ol
➜ yarn add ol-layerswitcher
➜ yarn add leaflet

➜ rails generate controller demo index
routes.rb root "demo#index"

rails g stimulus ol-layer-group, etc.

had to copy leaflet images to public or vendor (didn't ascertain which was best). assets/images doesn't work

➜ fly launch [rails-openlayers-leaflet]
➜ fly deploy [said no to db, even though is pg]
Failed, can't do `fly launch` again to reset, automatically try `fly deploy`
fly open
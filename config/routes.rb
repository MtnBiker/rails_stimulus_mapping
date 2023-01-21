Rails.application.routes.draw do
  # get 'demo/index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root "demo#index"
  controller :demo do
    get :ollayerswitcher
    get :ollayergroup
    get :olosmmap
    get :olstaticimage
    get :leaflettest
  end
end

Rails.application.routes.draw do
  root to: 'static_pages#home'

  get '/property/:id' => 'static_pages#property'
  get '/bookings' => 'static_pages#bookings'
  get '/booking/:id/success' => 'static_pages#booking_success'
  get '/user/listings' => 'static_pages#listing_dashboard'
  get '/host' => 'static_pages#host'
  get '/host/:id' => 'static_pages#host'
  get '/login' => 'static_pages#login'

  namespace :api do
    # Add routes below this line
    resources :users, only: [:create]
    resources :sessions, only: [:create]
    resources :properties, only: [:index, :show, :create, :update]
    resources :bookings, only: [:create, :show]
    resources :charges, only: [:create]

    get '/listings/my-listings' => 'properties#owned_properties'
    get '/properties/:id/bookings' => 'bookings#get_property_bookings'
    get '/authenticated' => 'sessions#authenticated'
    get '/user/booked-properties' => 'bookings#get_user_bookings'
    get '/host/:id' => 'properties#show_owned_property'

    put '/user/update_avatar' => 'users#update_avatar'
    post 'charges/mark_complete' => 'charges#mark_complete'
    delete '/sessions' => 'sessions#destroy'

  end

end

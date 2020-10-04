Rails.application.routes.draw do
  constraints ->(req) { req.format == :json } do
    devise_for :clients, path: :clients, controllers: {
      sessions: 'clients/sessions'
    }

    devise_for :staffs, path: :staffs, controllers: {
      sessions: 'staffs/sessions'
    }

    get '/users/current_user', to: 'users#current_user', as: :current_user, defaults: { format: :json }

    namespace :staffs do
      resources :clients, defaults: { format: :json }
      resources :organizations, defaults: { format: :json }
      get '/clients/new', to: 'clients#new', as: :new_clients
      get '/users/current_user', to: 'users#current_user', as: :current_staff_user, defaults: { format: :json }
      post '/clients/exists', to: 'clients#check_exists_client_by_field', as: :client_exists, defaults: { format: :json }
    end

    namespace :clients do
      resources :organizations, only: :index, defaults: { format: :json }
    end
  end

  get '/clients/*slug', to: 'clients/application#index'
  get '/staffs/*slug', to: 'staffs/application#index'
  get '*slug', to: 'application#index'
end

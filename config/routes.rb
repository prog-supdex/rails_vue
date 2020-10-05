Rails.application.routes.draw do
  constraints ->(req) { req.format == :json } do
    devise_for :clients, path: :clients, controllers: {
      sessions: 'clients/sessions'
    }

    devise_for :staffs, path: :staffs, controllers: {
      sessions: 'staffs/sessions'
    }

    get '/users/current_user', to: 'users#current_user', as: :current_user

    namespace :staffs do
      get '/equipments/free_equipments', to: 'equipments#free_equipments', as: :free_equipments
      get '/users/current_user', to: 'users#current_user', as: :current_staff_user
      post '/clients/exists', to: 'clients#check_exists_client_by_field', as: :client_exists
      post '/equipments/exists', to: 'equipments#exists_by_serial_number', as: :equipment_exists

      resources :clients
      resources :organizations
      resources :equipments
    end

    namespace :clients do
      resources :organizations, only: :index
    end
  end

  get '/clients/*slug', to: 'clients/application#index'
  get '/staffs/*slug', to: 'staffs/application#index'
  get '*slug', to: 'application#index'
end

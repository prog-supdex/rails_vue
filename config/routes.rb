Rails.application.routes.draw do
  devise_for :clients, path: :clients, controllers: {
    sessions: 'clients/sessions'
  }

  devise_for :staffs, path: :staffs, controllers: {
    sessions: 'staffs/sessions'
  }

  root to: 'welcome#index'
  get '/users/current_user', to: 'users#current_user', as: :current_user, defaults: { format: :json }

  namespace :staffs do
    resources :clients, defaults: { format: :json }
    get '/clients/new', to: 'clients#new', as: :new_clients
    get '/users/current_user', to: 'users#current_user', as: :current_staff_user, defaults: { format: :json }
    post '/clients/exists', to: 'clients#check_exists_client_by_field', as: :client_exists, defaults: { format: :json }
  end

  namespace :clients do
    get '/organizations', to: 'organizations#index', as: :organizations
    resources :organizations, defaults: { format: :json }
  end
end

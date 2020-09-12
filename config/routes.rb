Rails.application.routes.draw do
  devise_for :clients, path: :clients, controllers: {
    sessions: 'clients/sessions',
    registrations: 'clients/registrations',
    confirmations: 'clients/confirmations',
    passwords: 'clients/passwords',
  }

  devise_for :staffs, path: :staffs, controllers: {
    sessions: 'staffs/sessions',
    registrations: 'staffs/registrations',
    confirmations: 'staffs/confirmations',
    passwords: 'staffs/passwords',
  }

  root to: 'welcome#index'
end

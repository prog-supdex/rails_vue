Rails.application.routes.draw do
  devise_for :clients, path: :clients, controllers: {
    sessions: 'clients/sessions'
  }

  devise_for :staffs, path: :staffs, controllers: {
    sessions: 'staffs/sessions'
  }

  root to: 'welcome#index'
end

class Clients::ApplicationController < ActionController::Base
  def index
    render layout: 'clients/layouts/application'
  end
end

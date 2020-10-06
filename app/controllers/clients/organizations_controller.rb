class Clients::OrganizationsController < ApplicationController
  def index
    unless client_signed_in?
      render json: [] and return
    end

    render json: current_client.organizations
  end
end

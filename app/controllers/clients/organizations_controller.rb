class Clients::OrganizationsController < ApplicationController
  def index
    authenticate_user!

    render json: current_client.organizations
  end

  private

  def authenticate_user!
    session['user_return_to'.freeze] = request.fullpath
    redirect_to new_client_session_path unless user_signed_in?
  end
end

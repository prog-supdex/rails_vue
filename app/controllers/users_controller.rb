class UsersController < ApplicationController
  def current_user
    unless signed_in?
      render json: nil and return
    end

    if current_staff.present?
      render json: current_staff.attributes.merge!(type: :staff)
    else
      render json: current_client.attributes.merge!(type: :client)
    end
  end
end

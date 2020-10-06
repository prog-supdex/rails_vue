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

  def reset_password
    render json:
       ChangePasswordByUserTypeCommand.call(
        id: params[:id],
        type: permitted_params[:type],
        password: permitted_params[:password],
        confirm_password: permitted_params[:confirm_password]
      )
  end

  private

  def permitted_params
    params.permit(:type, :password, :confirm_password)
  end
end

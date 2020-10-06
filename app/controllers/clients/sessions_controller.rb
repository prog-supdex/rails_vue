# frozen_string_literal: true

class Clients::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  def create
    resource = Client.find_for_database_authentication(email: sign_in_params[:email])

    return invalid_login_attempt unless resource

    if resource.valid_password?(sign_in_params[:password])
      sign_in("client", resource)

      render json: { success: true, name: resource.email } and return
    end

    invalid_login_attempt
  end

  def destroy
    super
  end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end

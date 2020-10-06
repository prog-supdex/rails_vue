class Staffs::ApplicationController < ApplicationController
  layout 'staffs/application'

  private

  def authenticate_user!
    session['user_return_to'.freeze] = request.fullpath
    redirect_to new_staff_session_path unless staff_signed_in?
  end
end

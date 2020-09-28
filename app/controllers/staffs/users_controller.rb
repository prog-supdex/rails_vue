class Staffs::UsersController < ApplicationController
  def current_user
    respond_to do |format|
      format.json { render json: current_staff }
    end
  end
end

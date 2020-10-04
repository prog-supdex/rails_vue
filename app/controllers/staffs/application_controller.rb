class Staffs::ApplicationController < ActionController::Base
  def index
    render layout: 'staffs/layouts/application'
  end
end

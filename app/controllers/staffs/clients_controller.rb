class Staffs::ClientsController < ApplicationController
  def index
    @clients = Client.select(:id, :name, :email)

    respond_to do |format|
      format.json { render json: @clients }
    end
  end

  def new
    @client = Client.new
  end

  def create
    @client = Client.new(permitted_params)
    @client.save

    respond_to do |format|
      format.json { render json: @client }
    end
  end

  private

  def permitted_params
    params.require('client').permit(:name, :email, :password, :phone)
  end
end

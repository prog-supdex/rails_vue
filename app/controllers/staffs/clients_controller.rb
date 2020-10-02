class Staffs::ClientsController < ApplicationController
  def index
    @clients = Client.select(:id, :name, :email)

    render json: @clients
  end

  def create
    @client = Client.new(permitted_params)
    @client.save

    render json: @client
  end

  def edit
    @client = Client.find(params[:id])

    render json: @client
  end

  def update
    @client = Client.find(params[:id])
    @client.assign_attributes(permitted_params)
    @client.organization_ids << params[:organization_id]
    @client.save

    render json: {
      success: @client.errors.messages.blank?,
      object: @client,
      errors: @client.errors.messages
    }
  end

  def check_exists_client_by_field
    respond_to do |format|
      format.json do
        render json: ExistsClientByField.call(field: params[:field], value: params[:value])
      end
    end
  end

  private

  def permitted_params
    params.require(:client).permit(:name, :email, :password, :phone)
  end
end

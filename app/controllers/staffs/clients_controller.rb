class Staffs::ClientsController < ApplicationController
  def index
    @clients = Client.select(:id, :name, :email, :phone)

    render json: @clients
  end

  def new
    @client = Client.new
  end

  def create
    @client = Client.new(permitted_params)
    @client.save

    render json: {
      success: @client.errors.messages.blank?,
      object: @client,
      errors: @client.errors.full_messages.join(', ')
    }
  end

  def show
    @client = Client.with_organization_ids.find(params[:id])

    render json: @client.as_json(only: %i[id name email phone organization_list_id])
  end

  def update
    @client = Client.find(params[:id])
    @client.assign_attributes(permitted_params.except('password'))
    @client.organization_ids << params[:client][:organization_id]
    @client.save

    render json: {
      success: @client.errors.messages.blank?,
      object: @client,
      errors: @client.errors.full_messages.join(', ')
    }
  end

  def check_exists_client_by_field
    respond_to do |format|
      format.json do
        render json: ExistsClientByField.call(field: params[:field], value: params[:value])
      end
    end
  end

  def destroy
    @client = Client.find(params[:id])
    @client.destroy

    render json: @client
  end

  private

  def permitted_params
    params.require(:client).permit(:name, :email, :password, :phone)
  end
end

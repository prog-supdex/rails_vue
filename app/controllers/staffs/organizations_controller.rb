class Staffs::OrganizationsController < ApplicationController
  def index
    render json: Organization.select(:id, :name, :ogrn, :inn, :org_type)
  end

  def create
    @organization = Organization.new(permitted_params)
    @organization.save

    render json: {
      success: @organization.errors.messages.blank?,
      object: @organization,
      errors: @organization.errors.messages
    }
  end

  def show
    @organization = Organization.with_client_ids.find(params[:id])

    render json: @organization.as_json(only: %i[id name inn ogrn org_type client_list_id])
  end

  def update
    @organization = Organization.find(params[:id])
    @organization.assign_attributes(permitted_params)
    @organization.client_ids = params[:organization][:client_list_id]
    @organization.save

    render json: {
      success: @organization.errors.messages.blank?,
      object: @organization,
      errors: @organization.errors.messages
    }
  end

  def destroy
    @organization = Organization.find(params[:id])
    @organization.destroy

    render json: @organization
  end

  private

  def permitted_params
    params.require(:organization).permit(:name, :ogrn, :inn, :org_type)
  end
end

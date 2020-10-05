class Staffs::OrganizationsController < ApplicationController
  before_action :find_organization, only: %i[update destroy]

  def index
    render json: Organization.select(:id, :name, :ogrn, :inn, :org_type)
  end

  def create
    @organization = Organization.new(permitted_params)
    @organization.save

    render json: response_data(@organization)
  end

  def show
    @organization = Organization.with_client_ids.find(params[:id])

    render json: @organization.as_json(only: %i[id name inn ogrn org_type client_list_id])
  end

  def update
    @organization.assign_attributes(permitted_params)
    @organization.client_ids = params[:organization][:client_list_id]
    @organization.save

    render json: response_data(@organization)
  end

  def destroy
    @organization.destroy

    render json: @organization
  end

  private

  def find_organization
    @organization = Organization.find(params[:id])
  end

  def permitted_params
    params.require(:organization).permit(:name, :ogrn, :inn, :org_type)
  end
end

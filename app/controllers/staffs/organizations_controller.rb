class Staffs::OrganizationsController < ApplicationController
  def index
    render json: current_staff.organizations
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

  def edit
    @organization = Organization.find(params[:id])

    render json: @organization
  end

  def update
    @organization = Organization.find(params[:id])
    @organization.assign_attributes(permitted_params)
    @organization.client_ids << params[:client_id]
    @organization.save

    render json: {
      success: @organization.errors.messages.blank?,
      object: @organization,
      errors: @organization.errors.messages
    }
  end

  private

  def permitted_params
    params.require(:organization).permit(:name, :ogrn, :inn, :org_type)
  end
end

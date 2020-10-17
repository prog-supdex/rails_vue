class Staffs::OrganizationsController < Staffs::ApplicationController
  include Pagy::Backend

  before_action :find_organization, only: %i[update destroy]

  #before_action :authenticate_user!

  def index
    @pagy, @records = pagy(OrganizationsFinderQuery.call(params: params), items: 10)

    render json: { organizations: @records, pagy: pagy_metadata(@pagy), sort: { field: params[:sort_field], desc: params[:desc] } }
  end

  def new; end

  def create
    @organization = Organization.new(permitted_params)
    @organization.save

    render json: response_data(@organization)
  end

  def show
    @organization = Organization.with_equipment_ids.with_client_ids.find(params[:id])

    render json: @organization.as_json(only: %i[id name inn ogrn org_type client_list_id equipment_list_id])
  end

  def update
    @organization.assign_attributes(permitted_params)
    @organization.client_ids = params[:organization][:client_list_id]
    @organization.equipment_ids = params[:organization][:equipment_list_id]
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

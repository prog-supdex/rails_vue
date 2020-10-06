class Staffs::EquipmentsController < Staffs::ApplicationController
  before_action :find_equipment, only: %i[update destroy]
  #before_action :authenticate_user!

  def index
    render json: Equipment.select(:id, :name, :serial_number, :equipment_type)
  end

  def free_equipments
    render json: Equipment.free_equipments.select(:id, :name)
  end

  def create
    @equipment = Equipment.new(permitted_params)
    @equipment.save

    render json: response_data(@equipment)
  end

  def show
    render json: Equipment.find(params[:id])
  end

  def update
    @equipment.update(permitted_params)

    render json: response_data(@equipment)
  end

  def exists_by_serial_number
    render json: Equipment.exists?(serial_number: params[:value])
  end

  def destroy
    @equipment.destroy

    render json: @equipment
  end

  private

  def find_equipment
    @equipment = Equipment.find(params[:id])
  end

  def permitted_params
    params.require(:equipment).permit(:name, :equipment_type, :serial_number, :organization_id)
  end
end

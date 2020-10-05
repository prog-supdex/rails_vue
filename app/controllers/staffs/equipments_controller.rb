class Staffs::EquipmentsController < Staffs::ApplicationController
  def index
    render json: Equipment.select(:id, :name, :serial_number, :equipment_type)
  end

  def create
    @equip = Equipment.new(permitted_params)
    @equip.save

    render json: response_data(@equip)
  end

  def show
    render json: Equipment.find(params[:id])
  end

  def update
    @equip = Equipment.find(params[:id])
    @equip.assign_attributes(permitted_params)
    @equip.save

    render json: response_data(@equip)
  end

  def check_exists_client_by_field
    render json: ExistsClientByField.call(field: params[:field], value: params[:value])
  end

  def destroy
    @equip = Client.find(params[:id])
    @equip.destroy

    render json: @equip
  end

  private

  def permitted_params
    params.require(:client).permit(:name, :equipment_type, :serial_number, :organization_id)
  end
end

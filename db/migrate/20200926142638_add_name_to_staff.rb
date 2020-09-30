class AddNameToStaff < ActiveRecord::Migration[6.0]
  def change
    add_column :staffs, :name, :string, null: false
  end
end

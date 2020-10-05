class CreateEquipments < ActiveRecord::Migration[6.0]
  def change
    create_table :equipments do |t|
      t.string :name, null: false
      t.string :equipment_type, null: false
      t.string :serial_number, null: false, unique: true
      t.references :organization

      t.timestamps
    end
  end
end

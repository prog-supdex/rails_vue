class CreateOrganizations < ActiveRecord::Migration[6.0]
  def change
    create_table :organizations do |t|
      t.string :name, null: false
      t.string :org_type, null: false
      t.string :inn, null: false
      t.string :ogrn, null: false

      t.timestamps
    end
  end
end

class CreateOrganizationClients < ActiveRecord::Migration[6.0]
  def change
    create_table :organization_clients do |t|
      t.references :client, null: false, foreign_key: true
      t.references :organization, null: false, foreign_key: true

      t.timestamps
    end

    add_index :organization_clients, %i[client_id organization_id], unique: true
  end
end

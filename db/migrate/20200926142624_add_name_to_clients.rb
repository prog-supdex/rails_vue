class AddNameToClients < ActiveRecord::Migration[6.0]
  def change
    add_column :clients, :name, :string, null: false
  end
end

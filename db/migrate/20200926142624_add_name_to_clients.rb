class AddNameToClients < ActiveRecord::Migration[6.0]
  def change
    add_column :clients, :name, :string
  end
end

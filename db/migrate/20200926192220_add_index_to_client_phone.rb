class AddIndexToClientPhone < ActiveRecord::Migration[6.0]
  disable_ddl_transaction!

  def change
    add_index :clients, :phone, unique: true, algorithm: :concurrently
  end
end

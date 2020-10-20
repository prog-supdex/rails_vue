class AddColumnLocaleToStaffAndClient < ActiveRecord::Migration[6.0]
  def change
    add_column :clients, :locale, :string, default: :ru
    add_column :staffs, :locale, :string, default: :ru
  end
end

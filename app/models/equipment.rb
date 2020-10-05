class Equipment < ApplicationRecord
  self.table_name = :equipments

  enum equipment_type: {
    primary: 'primary',
    secondary: 'secondary'
  }

  has_one :organization

  scope :free_equipments, -> { where(organization_id: nil) }
end

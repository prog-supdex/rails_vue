class Equipment < ApplicationRecord
  enum equipment_type: {
    primary: 'primary',
    secondary: 'secondary'
  }

  has_one :organization
end

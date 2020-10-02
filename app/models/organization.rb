class Organization < ApplicationRecord
  enum org_type: {
    individual: 'individual',
    juridical: 'juridical'
  }

  has_many :organization_clients
  has_many :clients, through: :organization_clients

  validates :name, :org_type, :inn, :ogrn, presence: true
end

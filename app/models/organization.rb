class Organization < ApplicationRecord
  has_many :organization_clients
  has_many :clients, through: :organization_clients
end

class Client < ApplicationRecord
  include DeviseModules

  has_many :organization_clients
  has_many :organizations, through: :organization_clients
end

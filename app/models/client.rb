class Client < ApplicationRecord
  include DeviseModules

  enum locale: {
    en: 'en',
    ru: 'ru'
  }

  has_many :organization_clients, dependent: :destroy
  has_many :organizations, through: :organization_clients

  validates :name, :phone, :email, presence: true

  def self.with_organization_ids
    left_joins(:organization_clients)
      .select("#{table_name}.*, array_agg(organization_clients.organization_id) AS organization_list_id")
      .group("#{table_name}.id")
  end
end

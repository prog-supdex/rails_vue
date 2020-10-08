class Organization < ApplicationRecord
  enum org_type: {
    individual: 'individual',
    juridical: 'juridical'
  }

  has_many :organization_clients, dependent: :destroy
  has_many :clients, through: :organization_clients
  has_many :equipments

  validates :name, :org_type, :inn, :ogrn, presence: true

  def self.with_client_ids
    left_joins(:organization_clients)
      .select("#{table_name}.*, array_agg(organization_clients.client_id) AS client_list_id")
      .group("#{table_name}.id")
  end

  def self.with_equipment_ids
    left_joins(:equipments)
      .select("#{table_name}.*, array_agg(equipments.id) AS equipment_list_id")
      .group("#{table_name}.id")
  end
end

module OrganizationsFinderQuery
  extend self

  FINDER_COLUMNS = %i[
    name
    inn
    ogrn
  ].freeze

  def call(query: nil)
    scope = Organization.select(:id, :name, :ogrn, :inn, :org_type)

    return scope if query.blank?

    scope.where(build_search_by_query, { query: "%#{query}%" })
  end

  private

  def build_search_by_query
    FINDER_COLUMNS.map{ |column| "#{column} ILIKE :query" }.join(' OR ')
  end
end

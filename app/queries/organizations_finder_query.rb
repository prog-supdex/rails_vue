module OrganizationsFinderQuery
  extend self

  FINDER_COLUMNS = %i[
    name
    inn
    ogrn
  ].freeze

  def call(params: {})
    scope = Organization.select(:id, :name, :ogrn, :inn, :org_type)

    return scope if params.blank?

    scope = filter_by_search_string(scope, params[:filter]) if params[:filter].present?
    scope = sort_by_field(scope, params[:sort_field], params[:desc]) if params[:sort_field].present?

    scope
  end

  private

  def build_search_by_query
    FINDER_COLUMNS.map{ |column| "#{column} ILIKE :query" }.join(' OR ')
  end

  def filter_by_search_string(scope, search_string)
    scope.where(build_search_by_query, { query: "%#{search_string}%" })
  end

  def sort_by_field(scope, field, descending)
    scope.order(field => descending.present? ? :desc : :asc)
  end
end

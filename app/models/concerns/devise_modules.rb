module DeviseModules
  extend ActiveSupport::Concern

  included do
    devise :database_authenticatable, :validatable
  end
end

module ChangePasswordByUserTypeCommand
  extend self

  ALLOWED_USER_TYPES = %w[staff client].freeze

  def self.call(id:, type:, password:, confirm_password:)
    type.downcase!

    return default_response if ALLOWED_USER_TYPES.exclude?(type)

    return default_response.merge!(errors: 'пароли не совпадают') if password != confirm_password

    scope = (type == 'staff' ? Staff : Client).find_by(id: id)

    return default_response.merge!(errors: 'пользователь не найден') if scope.blank?

    scope.assign_attributes(password: password)

    default_response.merge!(success: scope.save, object: { name: scope.name })
  end

  private

  def default_response
    { success: false, errors: 'произошла ошибка' }
  end
end

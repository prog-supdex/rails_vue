module ExistsClientByField
  ALLOW_FIELDS = %i[
    phone
    email
  ]

  def self.call(field:, value:)
    return false if ALLOW_FIELDS.exclude?(field.to_sym)

    Client.exists?(field => value)
  end
end

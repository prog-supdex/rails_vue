class OrganizationsChannels < ApplicationCable::Channel
  def subscribed
    stream_from 'organizations'
  end
end

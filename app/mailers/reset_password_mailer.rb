class ResetPasswordMailer < Devise::Mailer
  include Devise::Controllers::UrlHelpers
  default template_path: 'staffs/mailer'

  def welcome_reset_password_instructions
    @staff = params[:staff]
    create_reset_password_token(@staff)
    mail(to: @staff.email, subject: 'Welcome to the New Site')
  end
  #OrderMailer.with(order: order).new_order_email.deliver_now

  private

  def create_reset_password_token(user)
    raw, hashed = Devise.token_generator.generate(Staff, :reset_password_token)
    @token = raw
    user.reset_password_token = hashed
    user.reset_password_sent_at = Time.now.utc
    user.save
  end
end

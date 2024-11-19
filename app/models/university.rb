class University < ApplicationRecord
  validates :name, presence: true
  validates :location, presence: true
  validates :website, presence: true, format: URI::regexp(%w[http https])
  validates :contact_emails, presence: true
  validate :validate_contact_emails

  private

  def validate_contact_emails
    if contact_emails.empty?
      errors.add(:contact_emails, 'must have at least one email')
    else
      contact_emails.each do |email|
        unless email =~ URI::MailTo::EMAIL_REGEXP
          errors.add(:contact_emails, "#{email} is not a valid email")
        end
      end
    end
  end
end

require 'rails_helper'

RSpec.describe University, type: :model do
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:location) }
  it { should validate_presence_of(:website) }
  it { should validate_presence_of(:contact_emails) }

  it 'validates format of website URL' do
    university = University.new(website: 'invalid_url')
    university.validate
    expect(university.errors[:website]).to include('is invalid')
  end

  it 'validates presence of at least one contact email' do
    university = University.new(contact_emails: [])
    university.validate
    expect(university.errors[:contact_emails]).to include('must have at least one email')
  end

  it 'validates format of contact emails' do
    university = University.new(contact_emails: ['invalid_email'])
    university.validate
    expect(university.errors[:contact_emails]).to include('invalid_email is not a valid email')
  end
end

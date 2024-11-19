FactoryBot.define do
  factory :university do
    name { "Test University" }
    location { "Test Location" }
    website { "http://testuniversity.com" }
    contact_emails { ["info@testuniversity.com"] }
  end
end
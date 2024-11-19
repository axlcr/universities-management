class UniversitySerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :website, :contact_emails, :created_at, :updated_at
end
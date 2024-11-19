require 'rails_helper'

RSpec.describe "Api::V1::Universities", type: :request do
  let!(:universities) { create_list(:university, 3) } # Creates 3 universities for testing
  let(:university) { universities.first }
  let(:valid_attributes) do
    {
      name: 'Test University',
      location: 'Test Location',
      website: 'http://testuniversity.com',
      contact_emails: ['info@testuniversity.com']
    }
  end
  let(:invalid_attributes) { { name: '' } }

  describe "GET /index" do
    it "returns a list of universities" do
      get api_v1_universities_path
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body).size).to eq(3)
    end
  end

  describe "GET /show" do
    it "returns a specific university" do
      get api_v1_university_path(university.id)
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)["id"]).to eq(university.id)
    end

    it "returns not found for an invalid id" do
      get api_v1_university_path(9999)
      expect(response).to have_http_status(:not_found)
      expect(JSON.parse(response.body)["error"]).to eq("University not found")
    end
  end

  describe "POST /create" do
    it "creates a new university with valid attributes" do
      expect {
        post api_v1_universities_path, params: { university: valid_attributes }
      }.to change(University, :count).by(1)
      expect(response).to have_http_status(:created)
    end

    it "does not create a university with invalid attributes" do
      expect {
        post api_v1_universities_path, params: { university: invalid_attributes }
      }.not_to change(University, :count)
      expect(response).to have_http_status(:unprocessable_entity)
      expect(JSON.parse(response.body)["errors"]).to include("Name can't be blank")
    end
  end

  describe "PUT /update" do
    it "updates a university with valid attributes" do
      put api_v1_university_path(university.id), params: { university: { name: "Updated Name" } }
      expect(response).to have_http_status(:success)
      expect(university.reload.name).to eq("Updated Name")
    end

    it "does not update a university with invalid attributes" do
      put api_v1_university_path(university.id), params: { university: { name: "" } }
      expect(response).to have_http_status(:unprocessable_entity)
      expect(JSON.parse(response.body)["errors"]).to include("Name can't be blank")
    end
  end

  describe "DELETE /destroy" do
    it "deletes a university" do
      expect {
        delete api_v1_university_path(university.id)
      }.to change(University, :count).by(-1)
      expect(response).to have_http_status(:no_content)
    end
  end
end

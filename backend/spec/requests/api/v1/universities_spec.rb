require 'rails_helper'

RSpec.describe "Api::V1::Universities", type: :request do
  let!(:universities) { create_list(:university, 3) }
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
    it "returns a success status" do
      get api_v1_universities_path
      expect(response).to have_http_status(:success)
    end

    it "returns a list of universities" do
      get api_v1_universities_path
      parsed_response = JSON.parse(response.body)
      expect(parsed_response.size).to eq(3)
    end
  end

  describe "GET /show" do
    it "returns a success status for a valid university" do
      get api_v1_university_path(university.id)
      expect(response).to have_http_status(:success)
    end

    it "returns the correct university details" do
      get api_v1_university_path(university.id)
      parsed_response = JSON.parse(response.body)
      expect(parsed_response["id"]).to eq(university.id)
    end

    it "returns a not found status for an invalid university" do
      get api_v1_university_path(9999)
      expect(response).to have_http_status(:not_found)
    end

    it "returns an error message for an invalid university" do
      get api_v1_university_path(9999)
      parsed_response = JSON.parse(response.body)
      expect(parsed_response["error"]).to eq("University not found")
    end
  end

  describe "POST /create" do
    it "creates a new university with valid attributes" do
      expect {
        post api_v1_universities_path, params: { university: valid_attributes }
      }.to change(University, :count).by(1)
    end

    it "returns a created status for valid attributes" do
      post api_v1_universities_path, params: { university: valid_attributes }
      expect(response).to have_http_status(:created)
    end

    it "does not create a university with invalid attributes" do
      expect {
        post api_v1_universities_path, params: { university: invalid_attributes }
      }.not_to change(University, :count)
    end

    it "returns an unprocessable entity status for invalid attributes" do
      post api_v1_universities_path, params: { university: invalid_attributes }
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it "returns validation errors for invalid attributes" do
      post api_v1_universities_path, params: { university: invalid_attributes }
      parsed_response = JSON.parse(response.body)
      expect(parsed_response["errors"]).to include("Name can't be blank")
    end
  end

  describe "PUT /update" do
    it "updates a university with valid attributes" do
      put api_v1_university_path(university.id), params: { university: { name: "Updated Name" } }
      expect(university.reload.name).to eq("Updated Name")
    end

    it "returns a success status for valid updates" do
      put api_v1_university_path(university.id), params: { university: { name: "Updated Name" } }
      expect(response).to have_http_status(:success)
    end

    it "does not update a university with invalid attributes" do
      put api_v1_university_path(university.id), params: { university: { name: "" } }
      expect(university.reload.name).not_to eq("")
    end

    it "returns an unprocessable entity status for invalid updates" do
      put api_v1_university_path(university.id), params: { university: { name: "" } }
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it "returns validation errors for invalid updates" do
      put api_v1_university_path(university.id), params: { university: { name: "" } }
      parsed_response = JSON.parse(response.body)
      expect(parsed_response["errors"]).to include("Name can't be blank")
    end
  end

  describe "DELETE /destroy" do
    it "deletes a university" do
      expect {
        delete api_v1_university_path(university.id)
      }.to change(University, :count).by(-1)
    end

    it "returns a no content status for successful deletion" do
      delete api_v1_university_path(university.id)
      expect(response).to have_http_status(:no_content)
    end
  end
end

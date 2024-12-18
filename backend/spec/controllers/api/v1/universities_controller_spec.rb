require 'rails_helper'

RSpec.describe Api::V1::UniversitiesController, type: :controller do
  let!(:university) { create(:university) }
  let(:valid_attributes) do
    {
      name: 'Test University',
      location: 'Test Location',
      website: 'http://testuniversity.com',
      contact_emails: ['info@testuniversity.com']
    }
  end
  let(:invalid_attributes) { { name: '' } }

  describe 'GET #index' do
    it 'returns a success response' do
      get :index
      expect(response).to have_http_status(:success)
    end

    it 'returns all universities' do
      get :index
      parsed_response = JSON.parse(response.body)
      expect(parsed_response.size).to eq(University.count)
    end
  end

  describe 'GET #show' do
    context 'with valid id' do
      it 'returns a success response' do
        get :show, params: { id: university.id }
        expect(response).to have_http_status(:success)
      end

      it 'returns the university details' do
        get :show, params: { id: university.id }
        parsed_response = JSON.parse(response.body)
        expect(parsed_response['id']).to eq(university.id)
      end
    end

    context 'with invalid id' do
      it 'returns a not found response' do
        get :show, params: { id: 9999 }
        expect(response).to have_http_status(:not_found)
      end

      it 'returns a not found error message' do
        get :show, params: { id: 9999 }
        parsed_response = JSON.parse(response.body)
        expect(parsed_response['error']).to eq('University not found')
      end
    end
  end

  describe 'POST #create' do
    context 'with valid attributes' do
      it 'creates a new university' do
        expect {
          post :create, params: { university: valid_attributes }
        }.to change(University, :count).by(1)
      end

      it 'returns a created status' do
        post :create, params: { university: valid_attributes }
        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid attributes' do
      it 'does not create a new university' do
        expect {
          post :create, params: { university: invalid_attributes }
        }.not_to change(University, :count)
      end

      it 'returns an unprocessable entity status' do
        post :create, params: { university: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns validation errors' do
        post :create, params: { university: invalid_attributes }
        parsed_response = JSON.parse(response.body)
        expect(parsed_response['errors']).to include("Name can't be blank")
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid attributes' do
      it 'updates the university' do
        put :update, params: { id: university.id, university: { name: 'Updated Name' } }
        expect(university.reload.name).to eq('Updated Name')
      end

      it 'returns a success status' do
        put :update, params: { id: university.id, university: { name: 'Updated Name' } }
        expect(response).to have_http_status(:success)
      end
    end

    context 'with invalid attributes' do
      it 'does not update the university' do
        put :update, params: { id: university.id, university: { name: '' } }
        expect(university.reload.name).not_to eq('')
      end

      it 'returns an unprocessable entity status' do
        put :update, params: { id: university.id, university: { name: '' } }
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns validation errors' do
        put :update, params: { id: university.id, university: { name: '' } }
        parsed_response = JSON.parse(response.body)
        expect(parsed_response['errors']).to include("Name can't be blank")
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'deletes the university' do
      expect {
        delete :destroy, params: { id: university.id }
      }.to change(University, :count).by(-1)
    end

    it 'returns a no content status' do
      delete :destroy, params: { id: university.id }
      expect(response).to have_http_status(:no_content)
    end
  end
end

class Api::V1::UniversitiesController < ApplicationController
  before_action :set_university, only: [:show, :update, :destroy]

  # GET /universities
  def index
    @universities = University.all
    render json: @universities
  end

  # GET /universities/:id
  def show
    render json: @university
  end

  # POST /universities
  def create
    @university = University.new(university_params)

    if @university.save
      render json: @university, status: :created
    else
      render json: { errors: @university.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PUT /universities/:id
  def update
    if @university.update(university_params)
      render json: @university
    else
      render json: { errors: @university.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /universities/:id
  def destroy
    @university.destroy
    head :no_content
  end

  private

  def set_university
    @university = University.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'University not found' }, status: :not_found
  end

  def university_params
    params.require(:university).permit(:name, :location, :website, contact_emails: [])
  end
end

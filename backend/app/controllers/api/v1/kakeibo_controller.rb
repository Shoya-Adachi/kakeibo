class Api::V1::KakeiboController < ApplicationController
  def create
    kakeibo = Kakeibo.build(
      user_id: params[:user_id],
      date: params[:date],
      salary: params[:salary],
      salary2: params[:salary2],
      total_income: params[:total_income],
      food: params[:food],
      life: params[:life],
      medical: params[:medical],
      entertainment: params[:entertainment],
      amusement: params[:amusement],
      etc: params[:etc],
      total_expenditures: params[:total_expenditures],
    )

    if kakeibo.save
      render json: { status: "success", data: kakeibo }, status: :created
    else
      render json: { status: "error", errors: kakeibo.errors.full_messages }, status: :unprocessable_entity
    end
  end
end

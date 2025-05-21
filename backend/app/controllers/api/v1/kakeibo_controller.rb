class Api::V1::KakeiboController < ApplicationController
  def index
        kakeibo = Kakeibo.all

        render json: kakeibo.as_json(only: [:id, :date, :total_income,:total_expenditures])
  end


  def total
    month = params[:month] || Date.today.strftime("%Y-%m")
    start_date = Date.parse("#{month}-01")
    end_date = start_date.end_of_month

    total_income = Kakeibo.where(date: start_date..end_date).pluck(:total_income).map(&:to_i).sum
    total_expend = Kakeibo.where(date: start_date..end_date).pluck(:total_expenditures).map(&:to_i).sum
    total = total_income - total_expend
    render json: { month: month, total_amount: total }
  end


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

  def destroy
    kakeibo = Kakeibo.find(params[:id])

      if kakeibo
        kakeibo.destroy
        head :no_content
      else
        render json: {error: 'data not found'}, status: :not_found
      end
  end
end

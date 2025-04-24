class CreateKintais < ActiveRecord::Migration[7.2]
  def change
    create_table :kintais do |t|
      t.references :user, null: false, foreign_key: true, type: :string
      t.date :date
      t.string :salary
      t.string :salary2
      t.string :total_income
      t.string :food
      t.string :life
      t.string :medical
      t.string :entertainment
      t.string :amusement
      t.string :etc
      t.string :total_expenditures

      t.timestamps
    end
  end
end

class CreateKoteis < ActiveRecord::Migration[7.2]
  def change
    create_table :koteis, id: false do |t|
      t.string :year
      t.string :month
      t.string :rent
      t.string :insurance
      t.string :postage
      t.string :water_supply
      t.string :electric
      t.string :etc

      # 複合キー設定
      t.index [:year, :month], unique: true
    end
  end
end

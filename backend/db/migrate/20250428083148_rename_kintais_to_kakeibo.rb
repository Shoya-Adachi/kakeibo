class RenameKintaisToKakeibo < ActiveRecord::Migration[7.2]
  def change
    rename_table :kintais, :kakeibos
  end
end

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2025_04_24_014531) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "kintais", force: :cascade do |t|
    t.string "user_id", null: false
    t.date "date"
    t.string "salary"
    t.string "salary2"
    t.string "total_income"
    t.string "food"
    t.string "life"
    t.string "medical"
    t.string "entertainment"
    t.string "amusement"
    t.string "etc"
    t.string "total_expenditures"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_kintais_on_user_id"
  end

  create_table "koteis", id: false, force: :cascade do |t|
    t.string "year"
    t.string "month"
    t.string "rent"
    t.string "insurance"
    t.string "postage"
    t.string "water_supply"
    t.string "electric"
    t.string "etc"
    t.index ["year", "month"], name: "index_koteis_on_year_and_month", unique: true
  end

  create_table "users", id: :string, force: :cascade do |t|
    t.string "name"
    t.string "password_digest"
  end

  add_foreign_key "kintais", "users"
end

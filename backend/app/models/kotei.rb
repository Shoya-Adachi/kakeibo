class Kotei < ApplicationRecord
  validates :year, presence: true
  validates :month, presence: true
  validates_uniqueness_of :year, scope: :month
end

class Event < ApplicationRecord
  belongs_to :room

  validates :title, presence: true
  validates :start_time, presence: true
  validates :content, presence: true
end

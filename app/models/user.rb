class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
  :recoverable, :rememberable, :validatable, :omniauthable, omniauth_providers: [:google_oauth2]

  validates :name, presence: true

  has_many :sns_credentials
  has_many :room_users
  has_many :rooms, through: :room_users
  has_many :messages
end

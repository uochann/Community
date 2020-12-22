FactoryBot.define do
  factory :message do
    content { Faker::Lorem.sentence }
    association :user
    association :room

    after(:build) do |message|
      message.image.attach(io: File.open('app/assets/images/image.png'), filename: 'image.png')
    end
  end
end

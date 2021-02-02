json.array! @messages do |message|
  json.content message.content
  if message.image.present?
    json.image url_for(message.image)
  end
  json.date  message.created_at.strftime('%Y/%m/%d %H:%M')
  json.user_name message.user.name
  json.id message.id
end
json.id        @message.id
json.content   @message.content
json.date      @message.created_at.strftime('%Y/%m/%d %H:%M')
json.user_name @message.user.name
if @message.image.present?
  json.image url_for(@message.image)
end
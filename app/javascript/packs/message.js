$(document).on('turbolinks:load', function(){
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = ` <div class="message">
                  <div class="upper-message">
                    <div class="message-user">
                      ${message.user.name}
                    </div>
                    <div class="message-date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <div class="message-content">
                      ${message.content}
                    </div>
                    <%= image_tag ${message.image}.variant(resize: '500x500'), class: 'message-image' if message.image.attached? %>
                  </div>
                </div>`
  return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = (window.location.href);
    $.ajax({
      url: url,
      type: 'POST',
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#message_content').val('');
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
  })
});
$(document).on('turbolinks:load', function(){
    function buildHTML(message) {
      var img = message.image ? `<img class="message-image" src=${message.image}>` : "";
      console.log(message.image);
      var content = message.content ? `${ message.content }` : "";
      if (message.image != '') {
        var html = `<div class= "message" data-message-id=${message.id}>
        <div class="upper-message">
          <p class="message-user">
            ${message.user_name}
          </p>
          <p class="message-date">
            ${message.date}
          </p>
        </div>
        <p class="lower-message">
          <div class="message-content">
          ${content}
          </div>
          ${img}
        </p>
      </div>`
      } else {
      var html = `<div class= "message" data-message-id=${message.id}>
                    <div class="upper-message">
                      <p class="message-user">
                        ${message.user_name}
                      </p>
                      <p class="message-date">
                        ${message.date}
                      </p>
                    </div>
                    <p class="lower-message">
                      <div class="message-content">
                      ${content}
                      </div>
                    </p>
                  </div>`}
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
        $('#message_image').val('');
        scrollBottom();
      })
      .fail(function(data){
        alert('エラーが発生したためメッセージは送信できませんでした。');
      })
      .always(function(data){
        $('.form-submit').prop('disabled', false);
      })
      return false
    })
    var reloadMessages = function(){
      var href = 'api/messages#index {:format=>"json"}'
      var last_message_id = $('.message:last').data('message-id');
      $.ajax({
        url: href,
        type: 'GET',
        data: {id: last_message_id},
        dataType: 'json',
      })
      .done(function(messages) {
        if (messages.length !== 0) {
          var insertHTML = '';
          $(insertHTML).remove();
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
          $('.messages').append(insertHTML);
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
          $('#message_content').val('');
        }
      })
      .fail(function(){
        alert("自動更新に失敗しました")
      });
    };
  if (document.location.href.match(/\/rooms\/\d+\/messages/)){
    setInterval(reloadMessages, 7000)};
});

  function scrollBottom(){
    var target = $('.message').last();
    var position = target.offset().top + $('.messages').scrollTop();
    $('.messages').animate({
      scrollTop: position
    }, 300, 'swing');
  }

$(document).on('turbolinks:load', function(){
    function buildHTML(message) {
      var content = message.content ? `${ message.content }` : "";
      var img = message.image ? `<img src= ${ message.image }>` : "";
      var html = `<div class="message" data-id="${message.id}">
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
        scrollBottom();
      })
      .fail(function(data){
        alert('エラーが発生したためメッセージは送信できませんでした。');
      })
      .always(function(data){
        $('.form-submit').prop('disabled', false);
      })
    })
    var reloadMessages = function(){
      if (window.location.href.match(/\/rooms\/\d+\/messages/)){
      var url = (window.location.href);
      var last_message_id = $('.message:last').data('message-id');   // カスタムデータ属性を利用して、最新のメッセージIDを取得しています。
      $.ajax({
        url:  url,
        type: 'GET',
        data: {id: last_message_id},
        dataType: 'json'
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);
        $('#message_content').val('');
        console.log('最新のメッセージを取得しました')
        scrollBottom();
      })
      .fail(function(){
        alert("自動更新に失敗しました")
      });
    };
  };});

  function scrollBottom(){
    var target = $('.message').last();
    var position = target.offset().top + $('.messages').scrollTop();
    $('.messages').animate({
      scrollTop: position
    }, 300, 'swing');
  }

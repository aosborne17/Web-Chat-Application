//$(function() {
//          $('#sendBtn').bind('click', function() {
//            var value = document.getElementById("msg").value;
//            console.log(value)


//            var users_name = await load_name()
//            var today = new Date();
//            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//            var div = document.getElementById('container');
//            var content = '<div class="container">' + '<b style="color:#000" class="right">'+users_name+'</b><p>' + value +'</p><span class="time-right">' + time + '</span></div>'
//            if (global_name == msg.name){
//               content = '<div class="container darker">' + '<b style="color:#000" class="left">'+msg.name+'</b><p>' + msg.message +'</p><span class="time-left">' + n + '</span></div>'
//            div.innerHTML += content;

//            $.getJSON('/run',
//                function(data) {
//              //do nothing
//            });
//            return false;
//          });
//        });


// Find out where this message is coming from
async function show_message(msg, scroll) {
//    $('#sendBtn').bind('click', function() {
            var value = document.getElementById("msg").value;
            var users_name = await load_name()
            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

            var content = '<div class="container">' + '<b style="color:#000" class="right">'+msg.name+'</b><p>' + msg.message +'</p><span class="time-right">' + time + '</span></div>'
            if (users_name == msg.name){
               content = '<div class="container darker">' + '<b style="color:#000" class="left">'+msg.name+'</b><p>' + msg.message +'</p><span class="time-left">' + time + '</span></div>'
            }
            var div = document.getElementById('messages')
            div.innerHTML += content;
            }

            if (scroll){
    scrollSmoothToBottom("messages");
}


/////////////////////////////////////////////////////////////////////
//async function add_messages(msg, scroll){
////    $('#sendBtn').bind('click', function() {
//    var value = document.getElementById("msg").value;
//    var users_name = await load_name()
//    var today = new Date();
//    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//
//     var content = '<div class="container">' + '<b style="color:#000" class="right">'+users_name+'</b><p>' + msg.message +'</p><span class="time-right">' + time + '</span></div>'
//     if (users_name == msg.name){
//        content = '<div class="container darker">' + '<b style="color:#000" class="left">'+users_name+'</b><p>' + msg.message +'</p><span class="time-left">' + time + '</span></div>'
//     }
//     var div = document.getElementById('messages')
//     div.innerHTML += content;
//     }
//
//  if (scroll){
//    scrollSmoothToBottom("messages");
//  }









async function load_name(){
  return await fetch('/get_name')
       .then(async function (response) {
          return await response.json();
      }).then(function (text) {
          return text["name"]
      });
};


async function load_messages() {
  return await fetch('/get_messages')
   .then(async function (response) {
      return await response.json();
  }).then(function (text) {
      console.log(text)
      return text
  });
}

$(function()
{
  $('.msgs') .css({'height': (($(window).height()) * 0.7)+'px'});

  $(window).bind('resize', function(){
      $('.msgs') .css({'height': (($(window).height()) * 0.7)+'px'});
  });
});


function scrollSmoothToBottom (id) {
 var div = document.getElementById(id);
 $('#' + id).animate({
    scrollTop: div.scrollHeight - div.clientHeight
 }, 500);
}

var socket = io.connect('http://' + document.domain + ':' + location.port);
  socket.on( 'connect', async function() {
    var usr_name = await load_name()
    if (usr_name != ""){
      socket.emit( 'event', {
        message: usr_name + ' just connected to the server!',
        connect: true
      } )
    }
    var form = $( 'form#msgForm' ).on( 'submit', async function( e ) {
      e.preventDefault()

      // get input from message box
      let msg_input = document.getElementById("msg")
      let user_input = msg_input.value
      let user_name = await load_name()

      // clear msg box value
      msg_input.value = ""

      // send message to other users
      socket.emit( 'event', {
        message : user_input,
        name: user_name
      } )
    } )
  } )


  socket.on( 'message response', function( msg ) {
    show_message(msg, true)
  })

window.onload = async function() {
  var msgs = await load_messages()
  for (i = 0; i < msgs.length; i++){
    scroll = false
    if (i == msgs.length-1) {scroll = true}
    show_message(msgs[i], scroll)
  }

// If we are logged in we will only be shown the logout option and visa versa
// .hide() is a helpful jquery function
  let name = await load_name()
  if (name != ""){
    $("#login").hide();
  }else{
    $("#logout").hide();
  }

}
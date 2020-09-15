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

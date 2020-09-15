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

async function show_message() {
//    $('#sendBtn').bind('click', function() {
            var value = document.getElementById("msg").value;
            var users_name = await load_name()
            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var div = document.getElementById('container');
            var content = '<div class="container">' + '<b style="color:#000" class="right">'+users_name+'</b><p>' + value +'</p><span class="time-right">' + time + '</span></div>'
//            if (global_name == msg.name){
//               content = '<div class="container darker">' + '<b style="color:#000" class="left">'+msg.name+'</b><p>' + msg.message +'</p><span class="time-left">' + n + '</span></div>'
            div.innerHTML += content;

};


async function load_name() {
    return await fetch('/get_name')
        .then( async function (response) {
            return await response.json();
        }).then(function (text) {
            // this will return the value associated with the key name
            console.log(text["name"])
            return text["name"]
    });
};
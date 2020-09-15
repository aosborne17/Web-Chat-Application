$(function() {
          $('#sendBtn').bind('click', function() {
            var value = document.getElementById("msg").value;
            console.log(value)
            document.append(value)
            $.getJSON('/run',
                function(data) {
              //do nothing
            });
            return false;
          });
        });


//fetch('/hello')
//    .then(function (response) {
//        return response.text();
//    }).then(function (text) {
//        console.log('GET response text:');
//        console.log(text); // Print the greeting as text
//    });
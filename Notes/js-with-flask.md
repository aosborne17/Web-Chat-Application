# Javascript With Flask

Remember the difference between POST and GET. 
When you POST mail, you head to the post office with your letter filled with information. 
When you GET mail, you head to the post office again but this time you’re picking up something that’s been left for you.

## Ajax

- In order to load in our javascript file using flask, we miust follow the syntax shown below

- This will allow us to then run the JS functions that interact with our Python backend

```html
<script type=text/javascript
        src="{{ url_for('static', filename='index.js') }}">
</script>
```

### Running a python function from flask

```
$(function() {
          // here we are binding the id of a html element
          // Note that the "#" sign means jquery will look for an element id = to what is specified
          $('#sendBtn').bind('click', function() {
          // When the button is clicked, it will run a function specified in our python files
            $.getJSON('/run',
                function(data) {
              //do nothing
            });
            return false;
          });
        });
```

- For testing purposes, we made a simple function below

```python
@app.route("/run")
def run():
    print("Clicked")
    return "Nothing"
```

- When we click the button on our web interface, we will see in the terminal that the function has run

![](/images/clicked-showing-in-terminal.png)


### Now we can create a function


## Updating the div

- We want to be able to append the message send by the user and show it on the webpage, without erasing the
webpage completely 


## Understanding async functions and await

Initially we had the below code

```
function load_name() {
    fetch('/get_name')
        .then(function (response) {
            return response.json;
        }).then(function (text) {
            console.log('GET response text:');
            // this will return the value associated with the key name
            console.log(text["name"])
            return text["name"]
    });
};
```


However there was an issue in seeing the user's name because it was not being loaded in time and we would see 'undefined'
To combat this we had to tell it to wait for the 'get_name' function to run first

- This also meant that we had to specify this function as an async function
```
async function load_name() {
    return await fetch('/get_name')
        .then(function (response) {
            return response.json;
        }).then(function (text) {
            console.log('GET response text:');
            // this will return the value associated with the key name
            console.log(text["name"])
            return text["name"]
    });
};
```

- It is also important to note that when calling the function, we have to add an 'await' as seen below

````html
var users_name = load_name()
````


## Errors overcame with await/async

- Came across and error which stated

```commandline
Uncaught SyntaxError: await is only valid in async function
```

- This was because the 'sendBtn' line is a function in itself and we called the await syntax within it
- This did not work as the Btn function was not async
- To combat this we commented out the onClick sendBtn function and instead created a new function that cause an event on Click
which we specified in the HTML template

This will mean that when we send a message we can see our Name, the time of the message and the message contents

![](/images/name-date-and-time-showing.png)

## Querying the database so that all the messages are shown for each user

- At the moment we are only able to see the messages sent by our user, in order for people to chat to eachother
they would need to be able to see the messages sent from others

## Jquery
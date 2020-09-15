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

## Jquery
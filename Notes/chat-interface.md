# Creating the chat interface

## Bootstrap a Send input 

- We took a text window from bootstrap which had a send button to which the user could send the message

```html
<div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2">
  <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="button">Button</button>
  </div>
</div>
```

## Bootstrap a chat window

```html
<link rel= "stylesheet" type= "text/css" href= "{{ url_for('static',filename='index.css') }}">
```
from flask import session
from flask_socketio import SocketIO
import time
from application import create_app
from application.database import Database
import config


# Setting a variable named to be equal to the app created in the __init__.py
app = create_app()

"""
A socket establishes a connection through which one computer can interact with another
Socket IO is very beneficial tool, it works by connectiong two nodes on a network to communicate with eachother
First the server node listens on a particular port at an IP, the client server can then reach out to the server and
successfully connect
"""
# Here we are taking the app we created and imbedding it with the socket.io functionality
socketio = SocketIO(app)


"""
When using socketio. messages are received by both parties as events, with flask-socketio the server
needs to register handlers for these events, similar to how routes are handled by view functions
"""

"""
sending an event is done with: socket.emit()
receiving an event is done by registering a listener: socket.on(<event name>, <listener>)
"""

@socketio.on('event')
def handle_my_custom_event(json, methods=['GET', 'POST']):
    """
    :param json: json
    :param methods: GET, POST
    :return: None
    """

    # Here we are converting the JSON object we receive and turning it into a dictionary
    data = dict(json)
    if "name" in data:
        db = Database()
        # we are passing the name and message from the json object into the database function query, so we can save it
        db.save_message(data["name"], data["message"])

    socketio.emit('message response', json)

# Running the application


if __name__ == '__main__':
    socketio.run(app, debug=True, host=str(config.Config.SERVER))
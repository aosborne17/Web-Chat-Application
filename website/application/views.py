from flask import Blueprint
from flask import Flask, render_template, url_for, redirect, request, session, jsonify, flash, Blueprint
from .database import Database


view = Blueprint("views", __name__)

# GLOBAL CONSTANTS
NAME_KEY = 'name'
MSG_LIMIT = 20


# VIEWS

"""
In flask we can stack decorators, in this instance whether the user goes to '/' or '/home' they will be directed to the
same web page
"""

@view.route('/')
@view.route('/home')
def home():
    """
    if not logged in, will be redirected to login page
    else the user will see the homepage
    :return: None
    """
    if NAME_KEY not in session:
        return redirect(url_for("views.login"))

    return render_template('index.html', **{"session": session})





@view.route('/login', methods=["POST", "GET"])
def login():
    """
    will display the login page where the user can enter their name

    :return: None
    """
    if request.method == "POST":
        name = request.form["inputName"]
        if len(name) >= 3:
            session[NAME_KEY] = name
            flash(f'Successfully logged in as {name}.')
            return redirect(url_for("views.home"))
        else:
            flash("Name must be longer than two characters!")

    return render_template('login.html', **{"session": "session"})


@view.route('/logout')
def logout():
    """
    If this function is triggered then user will be logged out
    :return: None
    """
    session.pop(NAME_KEY, None)
    flash("You were logged out")
    return redirect(url_for("views.login"))
    # return render_template("login.html")


@view.route('/get_messages')
def get_messages():
    """

    :return: Returns object of all the messages in the database
    """
    db = Database()
    messages = db.get_messages()
    return jsonify(messages)


@view.route("/get_name")
def get_name():
    info = {"name": ""}
    if NAME_KEY in session:
        info = {"name": session[NAME_KEY]}
    # We must now convert the python dictionary to a JSON object so that JavaScript can understand it
    return jsonify(info)


# jsonify takes a python dictionary and returns a JSON object
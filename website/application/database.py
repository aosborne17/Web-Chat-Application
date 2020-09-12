import sqlite3
from sqlite3 import Error
from datetime import datetime
import time

# CONSTANTS

FILE = 'messages.db'
MY_TABLE = 'Messages'





class Database:
    """
    From this class we will read and write to our database and display it on our web server using quieres where necessary
    """
    # The init method is called when memory for the object is calculated, thus this is when we will establish a connection
    def __init__(self):
        self.conn = None
        try:
            self.conn = sqlite3.connect(FILE)
        except Error as e:
            print(e)

        # Now we have a connection we must add this to a cursor
        # The cursor method is what allows for us to query the db
        self.cursor = self.conn.cursor()
        # every time we initialise this database, it will call the function specified below
        # If that table doesn't exist, it will be created
        self._create_table()

    def create_table(self):
        """
        creates new table if one doesn't exist already
        :return: None
        """
        query = f"""CREATE TABLE IF NOT EXISTS {MY_TABLE}
                    (name TEXT, content, TEXT, time Date, id INTEGER PRIMARY KEY AUTOINCREMENT)"""
        # now we must execute this query using the cursor
        self.cursor.execute(query)
        # We then commit those changes to the database
        self.conn.commit()

    def close(self):
        """
        This will close the database connection
        :return: None
        """
        # It's important to close the connection after we have executed a query as it ensures no data is lost
        self.conn.close()

    def save_message(self, name, msg):
        """
        This saves the message into the table
        :param name: str
        :param msg: str
        :return: None
        """

        query = f"INSERT INTO {MY_TABLE} VALUES (?, ?, ?, ?)"
        # We are specifying the params to go in the execute
        self.cursor.execute(query, (name, msg, datetime.now(), None))
        self.conn.commit()


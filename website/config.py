from dotenv import load_dotenv
from pathlib import Path #
import os

"""
The config.py file should contain one variable assignment per line. When your app is initialized, 
the variables in config.py are used to configure Flask
"""

"""
We use a .env file because if we have sensistive information we would not want to store it on the config file, instead
we keep it seperate and out of the source control repo
"""

# setting the path for the .env file
env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)


class Config:
    """
    Set Flask configuration variables in the .env file to change the Flask config values
    """
    # Load the vars
    TESTING = os.getenv('TESTING')
    FLASK_DEBUG = os.getenv('FLASK_DEBUG')
    SECRET_KEY = os.getenv('SECRET_KEY')
    SERVER = os.getenv('SERVER')
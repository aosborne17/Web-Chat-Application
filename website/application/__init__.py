from flask import Flask

"""
The __init__.py files are required to make Python treat the directories as containing packages;
this is done to prevent directories with a common name, such as string,
from unintentionally hiding valid modules that occur later on the module search path.
"""

"""
There is a config object available which holds the loaded configuration values.
This is the place where Flask itself puts certain configuration values and also where extensions can put their configuration values. 
But this is also where you can have your own configuration.
"""


def create_app():
    """Construct the core application"""
    # the __name__ is resolving where the applicatio runs from and si Flask knows where to find the templtes, static files etc
    app = Flask(__name__, instance_relative_config=False)
    # this will load any config values that we have specified in config.py and load them into the app.config dictionary
    # WITH THE 'config.Config' we are calling the class within our config.py file to run
    app.config.from_object('config.Config')

    with app.app_context():
        # Some functionalities may not be properly interfaced with our application, therefore we must manually set up an app context
        from .views import view
        from .filters import _slice
        from .database import Database

        # Register Routes
        app.register_blueprint(view, url_prefix='/')

        # Register context processor
        @app.context_processor
        def slice():
            return dict(slice=_slice)

        return app
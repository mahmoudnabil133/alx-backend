#!/usr/bin/env python3
"""
users login with mocking database and
get local from request or user setting
or request headers or default
"""

from flask import Flask, render_template, request, g
from flask_babel import Babel
import pytz


class Config:
    '''Config class'''

    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.config.from_object(Config)
app.url_map.strict_slashes = False

babel = Babel(app)


@app.before_request
def before_request():
    "make g.user has the value of current user"
    g.user = get_user()


@babel.localeselector
def get_locale() -> str:
    """Retrieves the locale for a web page.

    Returns:
        str: best match
    """
    if request.args.get('locale') in app.config['LANGUAGES']:
        return request.args.get('locale')
    elif g.user and g.user.get('locale') in app.config['LANGUAGES']:
        return g.user.get('locale')
    elif request.headers.get('locale') in app.config['LANGUAGES']:
        return request.headers.get('locale')
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@babel.timezoneselector
def get_timezone():
    "get time zone from request or user setting or default"
    if request.args.get('timezone'):
        time_zone = request.args.get('timezone')
    elif g.user and g.user.get('timezone'):
        time_zone = g.user.get('timezone')
    else:
        time_zone = app.config['BABEL_DEFAULT_TIMEZONE']

    try:
        return pytz.timezone(time_zone)
    except pytz.exceptions.unknownTimeZoneError:
        return None


users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user():
    "get user from qurey request"
    if request.args.get('login_as'):
        return users.get(int(request.args.get('login_as')))
    return None


@app.route('/')
def index():
    '''default route'''
    return render_template("7-index.html", )


if __name__ == "__main__":
    "run the app"
    app.run(debug=True)

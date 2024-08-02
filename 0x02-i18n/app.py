#!/usr/bin/env python3
from flask import Flask, request, g
from flask_babel import Babel, gettext as _

app = Flask(__name__)
babel = Babel(app)

@app.before_request
def before_request():
    g.lang = 'de'  # Set default language to Spanish

@app.route('/')
def hello():
    return _('Hello, bro World!')  # Translatable string

if __name__ == '__main__':
    app.run(port=3000)

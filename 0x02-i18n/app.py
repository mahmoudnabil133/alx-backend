#!/usr/bin/env python3
'''Task 2: Get locale from request
'''

from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index() -> str:
    '''default route

    Returns:
        html: homepage
    '''
    return 'hello world'

# uncomment this line and comment the @babel.localeselector
# you get this error:
# AttributeError: 'Babel' object has no attribute 'localeselector'
# babel.init_app(app, locale_selector=get_locale)


if __name__ == "__main__":
    app.run(host='0.0.0.0')

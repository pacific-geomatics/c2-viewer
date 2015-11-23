# -*- coding: utf-8 -*-

import logging
from flask import Flask
from logging.handlers import RotatingFileHandler
from flask.ext.login import LoginManager, UserMixin, login_required


app = Flask(__name__)
app.config.from_object('config')

# Handle Logging
# https://gist.github.com/ibeex/3257877
handler = RotatingFileHandler('c2viewer.log', maxBytes=10000, backupCount=1)
handler.setLevel(logging.INFO)
app.logger.addHandler(handler)

# Handle Logins
login_manager = LoginManager()
login_manager.init_app(app)

import c2viewer.views

# https://exploreflask.com/organizing.html

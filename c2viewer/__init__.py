# -*- coding: utf-8 -*-

import logging
from flask import Flask
from logging.handlers import RotatingFileHandler

app = Flask(__name__)
app.config.from_object('config')

# Add Logging
# https://gist.github.com/ibeex/3257877
handler = RotatingFileHandler('c2viewer.log', maxBytes=10000, backupCount=1)
handler.setLevel(logging.INFO)
app.logger.addHandler(handler)

import c2viewer.views

# https://exploreflask.com/organizing.html

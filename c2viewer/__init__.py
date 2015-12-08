# -*- coding: utf-8 -*-

from flask import Flask
from flask.ext.stormpath import StormpathManager

app = Flask(__name__)
app.config.from_object('config')
stormpath_manager = StormpathManager(app)

import c2viewer.views

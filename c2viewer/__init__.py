# -*- coding: utf-8 -*-

from pymongo import MongoClient
from flask import Flask
from flask.ext.stormpath import StormpathManager


app = Flask(__name__)
app.config.from_object('config')

# Handle Logins
stormpath_manager = StormpathManager(app)

# Mongo Database
client = MongoClient()
db = client['pacgeo']

import c2viewer.views
import c2viewer.tile_server

# https://exploreflask.com/organizing.html

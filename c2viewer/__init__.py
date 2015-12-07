# -*- coding: utf-8 -*-

import functools
from pymongo import MongoClient
from flask import Flask, url_for
from flask.ext.stormpath import StormpathManager

url_for = functools.partial(url_for, _scheme='https')

app = Flask(__name__)
app.config.from_object('config')

# Handle Logins
stormpath_manager = StormpathManager(app)

# Mongo Database
client = MongoClient()
db = client['pacgeo']

import c2viewer.views
import c2viewer.tile_server

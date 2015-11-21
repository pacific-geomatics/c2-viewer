# -*- coding: utf-8 -*-

from flask import Flask
app = Flask(__name__)
app.config.from_object('config')

import c2viewer.views

"""
Organizing Flask app

https://exploreflask.com/organizing.html

config.py
requirements.txt
run.py
instance/
    config.py
yourapp/
    __init__.py
    views.py
    models.py
    forms.py
    static/
    templates/
"""

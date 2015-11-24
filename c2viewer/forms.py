# -*- coding: utf-8 -*-

from flask_wtf import Form
from wtforms import StringField
from wtforms.validators import DataRequired


class MyForm(Form):
    email = StringField('email', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])

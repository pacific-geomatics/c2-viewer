# -*- coding: utf-8 -*-

from flask_wtf import Form
from wtforms import StringField
from wtforms import PasswordField
from wtforms.validators import DataRequired


class LoginForm(Form):
    email = StringField('email', validators=[DataRequired()])
    password = PasswordField('password', validators=[DataRequired()])


class OAuth2Form(Form):
    email = StringField('email', validators=[DataRequired()])

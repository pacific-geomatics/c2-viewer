# -*- coding: utf-8 -*-

from flask_wtf import Form
from wtforms import PasswordField, HiddenField, StringField
from wtforms.validators import DataRequired


class LoginForm(Form):
    email = StringField('email', validators=[DataRequired()])
    password = PasswordField('password', validators=[DataRequired()])


class OAuth2Form(Form):
    email = StringField('email', validators=[DataRequired()])


class LogsForm(Form):
    clear = HiddenField('clear')

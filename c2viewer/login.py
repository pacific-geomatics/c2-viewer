# -*- coding: utf-8 -*-

from flask.ext.login import UserMixin, AnonymousUserMixin
from c2viewer import login_manager, app
from c2viewer.utils import get_ip


class Anonymous(AnonymousUserMixin):
    is_authenticated = False

    def __init__(self):
        self.id = 'Guest'
        self.email = 'guest@email.com'
        self.name = self.id


class User(UserMixin):
    is_authenticated = False
    user_database = app.config['VALID_EMAILS']

    def __init__(self, user_id):
        self.id = user_id

    def __getattr__(self, item):
        user = self.user_database.get(self.id)
        if user:
            return user.get(item, '')
        return ''

    def get(self, user_id):
        user = self.user_database.get(user_id, {})
        user.update({
            'is_anonymous': self.is_anonymous,
            'is_authenticated': self.is_authenticated})
        return user

    @property
    def is_authenticated(self):
        if bool(self.id in self.user_database):
            return True
        return False

    @property
    def is_anonymous(self):
        return not bool(self.id)


@login_manager.user_loader
def user_loader(user_id):
    if user_id:
        return User(user_id)
    return Anonymous()


@login_manager.request_loader
def request_loader(request):
    if 'email' in request.form:
        email = request.form.get('email')
        password = request.form.get('password')
        user = User(email)
        user.email = email
        user.submited_password = password
        return user
    elif 'email' in request.args:
        email = request.args.get('email')
        password = request.args.get('password')
        user = User(email)
        user.email = email
        user.submited_password = password
        return user
    elif get_ip(request) == '127.0.0.1':
        return User('localhost')
    return Anonymous()

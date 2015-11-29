# -*- coding: utf-8 -*-

from flask.ext.login import UserMixin, AnonymousUserMixin
from c2viewer import login_manager, db
from c2viewer.utils import get_ip


class Anonymous(AnonymousUserMixin):
    is_authenticated = False
    oauth2 = False

    def __init__(self):
        self.id = 'Guest'
        self.email = 'guest@example.com'


class User(UserMixin):
    is_authenticated = False
    oauth2 = False

    def __init__(self, email, password=''):
        self.id = email
        self.email = email
        self.password = password

    def get(self, email):
        user = db.users.find_one({'email': email}, {'_id': 0, 'password': 0})
        if not user:
            user = {'email': self.email}
        user.update({
            'is_anonymous': self.is_anonymous,
            'is_authenticated': self.is_authenticated})
        return user

    @property
    def is_authenticated(self):
        if db.users.find_one({'email': self.email}):
            return True
        return False

    @property
    def is_authorized(self):
        if db.users.find_one({'email': self.email, 'password': self.password}):
            return True
        return False

    @property
    def is_anonymous(self):
        return not self.email


@login_manager.user_loader
def user_loader(email):
    if email:
        return User(email)
    return Anonymous()


@login_manager.request_loader
def request_loader(request):
    if 'email' in request.form:
        return User(request.form.get('email'), request.form.get('password'))

    elif 'email' in request.args:
        return User(request.args.get('email'), request.args.get('password'))

    elif get_ip(request) == '127.0.0.1':
        return User('localhost', 'localhost')
    return Anonymous()

# -*- coding: utf-8 -*-

from flask.ext.login import UserMixin, AnonymousUserMixin
from c2viewer import login_manager, app


class Anonymous(AnonymousUserMixin):
    def __init__(self):
        self.id = 'Guest'
        self.email = 'guest@email.com'
        self.name = self.id


class User(UserMixin):
    user_database = app.config['VALID_EMAILS']

    def __init__(self, user_id):
        self.id = user_id

    @classmethod
    def get(cls, user_id):
        return cls.user_database.get(user_id)

    @property
    def is_authenticated(self):
        return bool(self.id in self.user_database)

    @property
    def is_anonymous(self):
        return not bool(self.id)

    @property
    def email(self):
        user = self.get(self.id)
        if user:
            return user.get('email')

    @property
    def name(self):
        user = self.get(self.id)
        if user:
            return user.get('name')


@login_manager.user_loader
def user_loader(user_id):
    if user_id:
        return User(user_id)
    return Anonymous()


@login_manager.request_loader
def request_loader(request):
    if 'email' in request.form:
        return User(request.form.get('email'))
    elif 'email' in request.args:
        return User(request.args.get('email'))
    return Anonymous()

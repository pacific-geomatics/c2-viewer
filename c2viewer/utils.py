# -*- coding: utf-8 -*-

import datetime
from flask import request
from flask.ext.login import current_user
from c2viewer import db


def get_ip(request):
    if len(request.access_route) > 1:
        return request.access_route[-1]
    else:
        return request.access_route[0]


def save_log(message):
    log = {'email': current_user.email,
           'route': request.url_rule.rule,
           'address': get_ip(request),
           'method': request.method,
           'datetime': str(datetime.datetime.now())}
    log.update(message)
    db.logs.insert(log)

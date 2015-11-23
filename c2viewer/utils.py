# -*- coding: utf-8 -*-

import json
import datetime
from flask import request
from flask.ext.login import current_user
from c2viewer import app


def get_ip(request):
    if len(request.access_route) > 1:
        return request.access_route[-1]
    else:
        return request.access_route[0]


def save_log(route, status_code, message=''):
    app.logger.info(json.dumps({
        'id': current_user.id,
        'route': request.url_rule.rule,
        'address': get_ip(request),
        'status': status_code,
        'datetime': str(datetime.datetime.now()),
        'message': message}))

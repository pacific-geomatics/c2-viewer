# -*- coding: utf-8 -*-

import datetime
import geocoder
from flask import request
from flask.ext.login import current_user
from c2viewer import db


def get_location(ip):
    # Return Fake Data if Localhost
    if ip == '127.0.0.1':
        return {'ip': ip,
                'city': 'Ottawa',
                'country': 'Canada',
                'isp': 'Rogers'}

    # Find Existing Location in Database
    location = db.location.find_one({'ip': ip}, {'_id': 0})
    if location:
        return location

    # Use Maxmind to find location based on IP
    g = geocoder.maxmind(ip)
    if g.ok:
        save_log({'status': 200, 'message': 'Get IP Location'})
        db.location.insert(g.json)
        return g.json
    return {}


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
           'datetime': str(datetime.datetime.now()),
           'location': get_location(get_ip(request))}
    log.update(message)
    db.logs.insert(log)

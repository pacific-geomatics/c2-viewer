# -*- coding: utf-8 -*-

import os
import hashlib
import subprocess
import requests
import re
from urllib import urlencode
from flask import render_template, send_file, jsonify, request, session, redirect
from c2viewer import app


@app.route('/state')
def state():
    state = hashlib.sha256(os.urandom(1024)).hexdigest()
    session['state'] = state
    return jsonify({'CLIENT_ID': app.config['CLIENT_ID'],
                    'STATE': state,
                    'APPLICATION_NAME': app.config['APPLICATION_NAME']})


@app.route('/')
def index():
    # Web Access
    if session.get('email', '') in app.config['VALID_EMAILS']:
        app.logger.info('Email is valid: {}'.format(session['email']))

        if request.args.get('state', '') == session.get('state'):
            app.logger.info('Accessing C2-Viewer: Web Access\n'
                            'Using State: {}'.format(session['state']))
            return render_template('map.html')

    # Offline Access
    if re.search(r'^http://localhost', request.url):
        app.logger.info('Accessing C2-Viewer: localhost')
        return render_template('map.html')
    return redirect('/login')


@app.route('/login', methods=['GET', 'POST'])
def login():
    state()
    params = {
        'client_id': app.config['CLIENT_ID'],
        'response_type': 'code',
        'scope': 'openid email',
        'redirect_uri': 'https://addxy.com/oauth2callback',
        'state': session['state'],
        'openid.realm': 'https://addxy.com',
        'hd': 'https://addxy.com',
    }
    return redirect('https://accounts.google.com/o/oauth2/auth?' + urlencode(params))


@app.route('/oauth2callback')
def oauth2callback():
    # https://developers.google.com/identity/protocols/OpenIDConnect

    if request.args.get('state', '') != session['state']:
        return jsonify({'message': 'Invalid state parameter.'}), 401

    payload = {
        'code': request.args.get('code', ''),
        'client_id': app.config['CLIENT_ID'],
        'client_secret': app.config['SECRET_KEY'],
        'redirect_uri': 'https://addxy.com/oauth2callback',
        'grant_type': 'authorization_code'
    }
    # Get Google Token
    r = requests.post('https://www.googleapis.com/oauth2/v3/token', data=payload)
    if not r.ok:
        return jsonify({'message': 'Error getting Google Token'}), 404

    # Get Google Account
    params = {'id_token': r.json().get('id_token')}
    r = requests.get('https://www.googleapis.com/oauth2/v1/tokeninfo', params=params)

    if not r.ok:
        return jsonify({'message': 'Error getting Google Account'}), 404

    # User Details
    email = r.json().get('email')
    email_verified = r.json().get('email_verified')

    if email_verified:
        if email in app.config['VALID_EMAILS']:
            session['email'] = email
            return redirect('/?' + urlencode({'state': session['state']}))
        else:
            session['email'] = None
            return jsonify({'message': 'Not Authorized'}), 401
    else:
        return jsonify({'message': 'Email not Verified'}), 401


@app.route("/<basemap>/<int:zoom>/<int:x>/<int:y><ext>", methods=['GET', 'POST'])
def tms(basemap, zoom, x, y, ext):

    # Convert to Google Maps compatible format
    google_y = (2 ** zoom) - y - 1

    # Tile information
    info = {
        'basemap': basemap,
        'x': x,
        'y': y,
        'google_y': google_y,
        'zoom': zoom,
        'ext': ext
    }
    tile = "/data/tile/{basemap}/{zoom}/{x}/{google_y}{ext}".format(**info)

    # Validate User
    key = request.args.get('api_key')
    if key not in ['123']:
        return jsonify({'message': 'Not Authorized - Invalid Token'}), 401

    # Check if Tile Exists
    if not os.path.exists(tile):
        return jsonify({'message': 'Tile does not exists'}), 404

    # Success
    else:
        return send_file(tile, mimetype='image/png')


@app.route("/hooks/github")
def hooks():
    app.logger.info(request.form)
    subprocess.call(['git pull'])
    return jsonify({'message': 'Hook push from Github'})

# -*- coding: utf-8 -*-

import os
import hashlib
import requests
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


@app.route('/check')
def check():
    return jsonify({'STATE': session['state']})


@app.route('/')
def index():
    return render_template('map.html')


@app.route('/user')
def user():
    # Standard Claims
    # http://openid.net/specs/openid-connect-basic-1_0.html#StandardClaims
    return jsonify({'sub': 12345678,
                    'name': 'Denis Carriere',
                    'given_name': 'Denis',
                    'family_name': 'Carriere',
                    'nickname': 'DenisC',
                    'email': 'carriere.denis@gmail.com',
                    'email_verified': True,
                    'gender': 'Male',
                    'phone_number': '613-770-5338',
                    'phone_number_verified': False,
                    })


@app.route('/login')
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
    """
    GET Response from Google
    - authuser
    - code
    - prompt
    - session_state
    - state
    """
    if request.args.get('state', '') != session['state']:
        return jsonify({'message': 'Invalid state parameter.'}), 401

    url = 'https://www.googleapis.com/oauth2/v3/token'
    payload = {
        'code': request.args.get('code', ''),
        'client_id': app.config['CLIENT_ID'],
        'client_secret': app.config['SECRET_KEY'],
        'redirect_uri': 'https://addxy.com/oauth2callback',
        'grant_type': 'authorization_code'
    }
    r = requests.post(url, data=payload)
    return jsonify(r.json())


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

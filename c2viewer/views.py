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
    if session.get('email', '') not in app.config['VALID_EMAILS']:
        redirect('/login')
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
    https://developers.google.com/identity/protocols/OpenIDConnect#exchangecode
    """

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
    user_id = r.json().get('user_id')

    if email_verified:
        if email in app.config['VALID_EMAILS']:
            session['email'] = email
            return redirect('/')
    return jsonify({'message': 'Not Authorized'}), 401


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

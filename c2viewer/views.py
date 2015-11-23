# -*- coding: utf-8 -*-

import os
import hashlib
import requests
from urllib import urlencode
from flask import render_template, send_file, jsonify, request, session, redirect, send_from_directory
from flask.ext.login import login_user, login_required, logout_user, current_user
from c2viewer import app
from c2viewer.utils import get_ip, save_log
from c2viewer.login import request_loader, user_loader
from c2viewer.forms import MyForm


@app.route('/')
def index():
    if current_user.is_authenticated:
        save_log('/', 200, 'Redirect to Map')
        return redirect('/map'), 301
    save_log('/', 301, 'Redirect to Login')
    return redirect('/login'), 301


@app.route('/static/css/<path:path>')
@login_required
def send_css(path):
    return send_from_directory('css', path)


@app.route('/static/js/<path:path>')
@login_required
def send_js(path):
    return send_from_directory('js', path)


@app.route('/map')
@login_required
def map():
    save_log('/map', 200, 'Render HTML Map')
    return render_template('map.html')


@app.route('/user', methods=['GET', 'POST'])
@login_required
def user():
    form = MyForm()
    if form.validate_on_submit():
        user = request_loader(request)
        save_log('/user', 200, 'Get JSON User Details')
        return jsonify({
            'user.id': user.get_id(),
            'user.is_authenticated': user.is_authenticated,
            'user.is_active': user.is_active,
            'user.is_anonymous': user.is_anonymous,
            'user.email': user.email,
            'user.name': user.name,
        })
    save_log('/user', 200, 'Render HTML User Form')
    return render_template('user.html', form=form), 200


@app.route('/current', methods=['GET'])
def current():
    save_log('/current', 200, 'Get JSON Current User Details')
    return jsonify({
        'current_user.id': current_user.id,
        'current_user.is_authenticated': current_user.is_authenticated,
        'current_user.is_active': current_user.is_active,
        'current_user.is_anonymous': current_user.is_anonymous,
        'current_user.email': current_user.email,
        'current_user.name': current_user.name
    })


@app.route("/logout")
@login_required
def logout():
    save_log('/logout', 200, 'Users Logout')
    logout_user()
    return jsonify({'message': 'User Logout'})


@app.route("/settings")
@login_required
def settings():
    save_log('/settings', 200, 'View Settings')
    return jsonify({'message': 'View Settings'})


@app.route('/state')
def state():
    state = hashlib.sha256(os.urandom(1024)).hexdigest()
    session['state'] = state
    save_log('/state', 200, 'Get JSON Current State')
    return jsonify({'CLIENT_ID': app.config['CLIENT_ID'],
                    'STATE': state,
                    'APPLICATION_NAME': app.config['APPLICATION_NAME']})


@app.route("/hooks/github", methods=['POST', 'GET'])
def hooks():
    if request.method == 'POST':
        save_log('/hooks/github', 200, 'POST JSON Webhook from Github')
        return jsonify(request.form)

    elif request.method == 'GET':
        save_log('/hooks/github', 200, 'GET JSON Webhook from Github')
        return jsonify({'message': 'Hook push from Github'})


@app.route("/logs")
def logs():
    log_file = app.config['LOG_FILE']
    if os.path.exists(log_file):
        with open(log_file) as f:
            save_log('/logs', 200, 'GET HTML Logs')
            return render_template('logs.html', logs=f.readlines())


@app.route('/login', methods=['GET', 'POST'])
def login():
    if get_ip(request) == '127.0.0.1':
        user = user_loader('localhost')
        login_user(user)
        save_log('/login', 301, 'Redirect to Index')
        return redirect('/'), 301
    else:
        if current_user.is_authenticated:
            save_log('/login', 301, 'Redirect to Index')
            return redirect('/'), 301
        else:
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
            save_log('/login', 301, 'Redirect to Google OAuth2')
            return redirect('https://accounts.google.com/o/oauth2/auth?' + urlencode(params)), 301


@app.route('/oauth2callback')
def oauth2callback():
    # https://developers.google.com/identity/protocols/OpenIDConnect

    if request.args.get('state', '') != session['state']:
        save_log('/oauth2callback', 401, 'Invalid state parameter')
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
        save_log('/oauth2callback', 401, 'Error getting Google Token')
        return jsonify({'message': 'Error getting Google Token'}), 404

    # Get Google Account
    params = {'id_token': r.json().get('id_token')}
    r = requests.get('https://www.googleapis.com/oauth2/v1/tokeninfo', params=params)

    if not r.ok:
        save_log('/oauth2callback', 401, 'Error getting Google Account')
        return jsonify({'message': 'Error getting Google Account'}), 404

    # User Details
    email = r.json().get('email')
    email_verified = r.json().get('email_verified')

    if email_verified:
        user = user_loader(email)
        login_user(user)
        if user.is_authenticated:
            return redirect('/')
        else:
            save_log('/oauth2callback', 401, 'Not Authorized')
            return jsonify({'message': 'Not Authorized'}), 401
    else:
        save_log('/oauth2callback', 401, 'Email not Verified')
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

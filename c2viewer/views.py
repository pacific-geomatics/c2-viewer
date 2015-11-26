# -*- coding: utf-8 -*-

import os
import hashlib
import requests
from urllib import urlencode
from flask import render_template, send_file, jsonify, request, session, redirect, abort
from flask.ext.login import login_user, login_required, logout_user, current_user, confirm_login
from c2viewer import app, login_manager
from c2viewer.utils import save_log
from c2viewer.login import request_loader, user_loader
from c2viewer.forms import MyForm


@app.route('/')
def index():
    if bool(current_user.is_authenticated):
        save_log({'status': 200, 'message': 'Redirect to Map'})
        return redirect('/map'), 301
    save_log({'status': 301, 'message': 'Redirect to Login'})
    return redirect('/login'), 301


@login_manager.unauthorized_handler
def unauthorized():
    save_log({'status': 401, 'message': 'Unauthorized'})
    abort(401)


@app.route('/map')
@login_required
def map():
    confirm_login()
    save_log({'status': 200, 'message': 'Render HTML Map'})
    return render_template('map.html')


@app.route('/user', methods=['GET', 'POST'])
@login_required
def user():
    form = MyForm()
    if form.validate_on_submit():
        user = request_loader(request)
        save_log({'status': 200, 'message': 'Get JSON User Details'})
        return jsonify(user.get(user.id))

    save_log({'status': 200, 'message': 'Render HTML User Form'})
    return render_template('user.html', form=form), 200


@app.route('/current', methods=['GET'])
@login_required
def current():
    save_log({'status': 200, 'message': 'Get JSON Current User Details'})
    return jsonify(current_user.get(current_user.id))


@app.route("/logout")
@login_required
def logout():
    save_log({'status': 200, 'message': 'Users Logout'})
    logout_user()
    return jsonify({'message': 'User Logout'})


@app.route("/settings")
@login_required
def settings():
    save_log({'status': 200, 'message': 'View Settings'})
    return jsonify({'message': 'View Settings'})


@app.route('/state')
def state():
    state = hashlib.sha256(os.urandom(1024)).hexdigest()
    session['state'] = state
    save_log({'status': 200, 'message': 'Get JSON Current State'})
    return jsonify({'CLIENT_ID': app.config['CLIENT_ID'],
                    'STATE': state,
                    'APPLICATION_NAME': app.config['APPLICATION_NAME']})


@app.route("/hooks/github", methods=['POST', 'GET'])
def hooks():
    if request.method == 'POST':
        save_log({'status': 200, 'message': 'POST JSON Webhook from Github'})
        return jsonify(request.form)

    elif request.method == 'GET':
        save_log({'status': 200, 'message': 'GET JSON Webhook from Github'})
        return jsonify({'message': 'Hook push from Github'})


@app.route("/logs")
@login_required
def logs():
    log_file = app.config['LOG_FILE']
    if os.path.exists(log_file):
        with open(log_file) as f:
            save_log({'status': 200, 'message': 'GET HTML Logs'})
            return render_template('logs.html', logs=f.readlines())


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = MyForm()
    if form.validate_on_submit():
        user = request_loader(request)

        if user.submited_password == user.password:
            login_user(user)
            save_log({'status': 301, 'message': 'Redirect to Index'})
            return redirect('/'), 301

    save_log({'status': 301, 'message': 'Redirect to Login'})
    return render_template('login.html', form=form), 200


@app.route('/oauth2', methods=['GET', 'POST'])
def oauth2():
    form = MyForm()
    if form.validate_on_submit():
        user = request_loader(request)
        state()
        params = {
            'client_id': app.config['CLIENT_ID'],
            'response_type': 'code',
            'scope': 'openid email',
            'redirect_uri': 'https://addxy.com/oauth2callback',
            'state': session['state'],
            'openid.realm': 'https://addxy.com',
            'hd': 'https://addxy.com',
            'login_hint': user.email
        }
        save_log({'status': 301, 'message': 'Redirect to Google OAuth2'})
        return redirect('https://accounts.google.com/o/oauth2/auth?' + urlencode(params)), 301
    return render_template('oauth2.html', form=form), 200


@app.route('/oauth2callback')
def oauth2callback():
    # https://developers.google.com/identity/protocols/OpenIDConnect

    if request.args.get('state', '') != session['state']:
        save_log({'status': 401, 'message': 'Invalid state parameter'})
        abort(401)

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
        save_log({'status': 401, 'message': 'Error getting Google Token'})
        abort(401)

    # Get Google Account
    params = {'id_token': r.json().get('id_token')}
    r = requests.get('https://www.googleapis.com/oauth2/v1/tokeninfo', params=params)

    if not r.ok:
        save_log({'status': 401, 'message': 'Error getting Google Account'})
        abort(401)

    # User Details
    email = r.json().get('email')
    email_verified = r.json().get('email_verified')

    if email_verified:
        user = user_loader(email)
        if user.is_authenticated:
            login_user(user)
            save_log({'status': 301, 'message': 'Redirect to Index'})
            return redirect('/')
        else:
            save_log({'status': 401, 'message': 'Not Authorized'})
            abort(401)
    else:
        save_log({'status': 401, 'message': 'Email not Verified'})
        abort(401)


# Error handling:
@app.errorhandler(404)
def page_not_found(e):
        return render_template('errors/404.html'), 404


@app.errorhandler(401)
def page_unauthorized(e):
        return render_template('errors/401.html'), 401


@app.errorhandler(500)
def page_not_implemented(e):
        return render_template('errors/500.html'), 500

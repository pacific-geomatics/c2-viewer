# -*- coding: utf-8 -*-

import os
import hashlib
import requests
import subprocess
import pymongo
from urllib import urlencode
from flask import render_template, jsonify, request, session, redirect, abort, send_from_directory
from flask.ext.login import login_user, login_required, logout_user, current_user, confirm_login
from c2viewer import app, login_manager, db
from c2viewer.utils import save_log
from c2viewer.login import request_loader, user_loader
from c2viewer.forms import LoginForm, OAuth2Form, LogsForm


@app.route('/robots.txt')
@app.route('/sitemap.xml')
def robots():
    return send_from_directory(app.static_folder, request.path[1:])


@app.route('/')
def index():
    if current_user.is_authenticated:
        save_log({'status': 200, 'message': 'Redirect to Map'})
        return redirect('/map'), 301
    save_log({'status': 301, 'message': 'Redirect to Login'})
    return redirect('/login'), 301


@login_manager.unauthorized_handler
def unauthorized():
    save_log({'status': 401, 'message': 'Unauthorized'})
    abort(401)


@app.route('/photos')
@app.route('/photos/')
@app.route('/photos/<int:photo_id>')
@login_required
def photos(photo_id=''):
    photo = db.photos.find_one({'id': photo_id})
    if photo:
        save_log({'status': 301, 'message': 'Redirect to AWS Photo'})
        return redirect(photo['url']), 301

    # Query Photos from MongoDB
    photos = db.photos.find({}, {'_id': 0})
    save_log({'status': 200, 'message': 'Render HTML Photo'})
    return render_template('photos.html', photos=photos), 200


@app.route('/map')
@login_required
def map():
    confirm_login()
    save_log({'status': 200, 'message': 'Render HTML Map'})
    return render_template('map.html', ACCESS_TOKEN=app.config['ACCESS_TOKEN']), 200


@app.route('/test')
def url_root():
    return jsonify({
        'user_agent': request.headers['User-Agent'],
        'url_root': request.url_root,
        'path': request.path,
        'script_root': request.script_root,
        'base_url': request.base_url,
        'url': request.url})


@app.route('/current', methods=['GET'])
@login_required
def current():
    save_log({'status': 200, 'message': 'Get JSON Current User Details'})
    return jsonify(current_user.get(current_user.id))


@app.route("/logout")
@login_required
def logout():
    save_log({'status': 200, 'message': 'Users Logout'})
    save_log({'status': 301, 'message': 'Redirect to Login'})
    logout_user()
    return redirect('/login'), 301


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
        subprocess.call(['make', 'publish'])
    elif request.method == 'GET':
        save_log({'status': 200, 'message': 'GET JSON Webhook from Github'})
    return jsonify({'message': 'Hook push from Github'})


@app.route("/logs", methods=['GET', 'POST'])
@login_required
def logs():
    form = LogsForm()
    if form.validate_on_submit():
        db.logs.remove({})
        save_log({'status': 200, 'message': 'Cleared Logs'})
        save_log({'status': 301, 'message': 'Redirect to Logs'})
        return redirect('/logs'), 301

    # Query MongoDB for logs
    sort = [('_id', pymongo.DESCENDING)]
    limit = int(request.args.get('limit', 50))
    logs = db.logs.find({}, {'_id': 0}).sort(sort).limit(limit)

    save_log({'status': 200, 'message': 'GET HTML Logs'})
    return render_template('logs.html', form=form, logs=logs)


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = request_loader(request)

        if user.is_authorized:
            login_user(user)
            save_log({'status': 301, 'message': 'Redirect to Index'})
            return redirect('/'), 301
        else:
            save_log({'status': 401, 'message': 'Failed login attempt'})

    save_log({'status': 301, 'message': 'Redirect to Login'})
    return render_template('login.html', form=form), 200


@app.route('/oauth2', methods=['GET', 'POST'])
def oauth2():
    form = OAuth2Form()
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
    save_log({'status': 200, 'message': 'Get Google Token', 'method': 'POST'})
    if not r.ok:
        save_log({'status': 401, 'message': 'Error getting Google Token'})
        abort(401)

    # Get Google Account
    params = {'id_token': r.json().get('id_token')}
    r = requests.get('https://www.googleapis.com/oauth2/v1/tokeninfo', params=params)

    # Error contacting Google's OAuth2 token info page
    save_log({'status': 200, 'message': 'GET Google Account'})
    if not r.ok:
        save_log({'status': 401, 'message': 'Error getting Google Account'})
        abort(401)

    # User Details
    email = r.json().get('email')
    email_verified = r.json().get('email_verified')

    # Checks if Google has verified the email
    if email_verified:

        # Load User in local database
        user = user_loader(email)

        # Checks if user has valid authentication to proceed to Index page
        if user.is_authenticated:
            login_user(user)
            save_log({'status': 200, 'message': 'User is Authenticated by OAuth2'})
            save_log({'status': 301, 'message': 'Redirect to Index'})
            return redirect('/')

        # User has valid Google credentials, but dot not have the authority to proceed.
        else:
            save_log({'status': 401, 'message': 'Not Authorized'})
            abort(401)

    # User has not been validated by Google OAuth2
    else:
        save_log({'status': 401, 'message': 'Email not Verified'})
        abort(401)


# Error handling:
@app.errorhandler(404)
def page_not_found(e):
    save_log({'status': 404, 'message': 'Page not found'})
    return render_template('errors/404.html'), 404


@app.errorhandler(401)
def page_unauthorized(e):
    save_log({'status': 401, 'message': 'Unauthorized'})
    return render_template('errors/401.html'), 401


@app.errorhandler(500)
def page_not_implemented(e):
    save_log({'status': 500, 'message': 'Page not Implemented'})
    return render_template('errors/500.html'), 500

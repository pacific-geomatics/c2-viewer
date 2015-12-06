# -*- coding: utf-8 -*-

import subprocess
import pymongo
from flask import render_template, jsonify, request, redirect, send_from_directory
from c2viewer import app, db
from c2viewer.utils import save_log
from c2viewer.forms import LogsForm
from flask.ext.stormpath import login_required, groups_required


@app.route('/robots.txt')
@app.route('/sitemap.xml')
def robots():
    return send_from_directory(app.static_folder, request.path[1:])


@app.route('/')
def index():
    return redirect('/map'), 301


@app.route('/map')
@groups_required(['pacgeo'])
@login_required
def map():
    save_log({'status': 200, 'message': 'Render HTML Map'})
    return render_template('map.html'), 200


@app.route('/cnl')
@groups_required(['pacgeo', 'cnl'], all=False)
@login_required
def cnl():
    save_log({'status': 200, 'message': 'Render HTML Map'})
    return render_template('map.html', ACCESS_TOKEN=app.config['ACCESS_TOKEN']), 200


@app.route("/hooks/github", methods=['POST', 'GET'])
def hooks():
    if bool(request.method == 'POST' and 'GitHub-Hookshot' in request.headers['User-Agent']):
        save_log({'status': 200, 'message': 'POST JSON Webhook from Github'})
        subprocess.call(['make', 'publish'])

    elif request.method == 'GET':
        save_log({'status': 200, 'message': 'GET JSON Webhook from Github'})
    return jsonify({'message': 'Hook push from Github'})


@app.route("/logs", methods=['GET', 'POST'])
@groups_required(['pacgeo', 'admin'])
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


@app.route('/photos/<int:photo_id>')
@app.route('/photos/')
@app.route('/photos')
@login_required
@groups_required(['pacgeo'])
def photos(photo_id=''):
    photo = db.photos.find_one({'id': photo_id})
    if photo:
        save_log({'status': 301, 'message': 'Redirect to AWS Photo'})
        return redirect(photo['url']), 301

    # Query Photos from MongoDB
    photos = db.photos.find({}, {'_id': 0})
    save_log({'status': 200, 'message': 'Render HTML Photo'})
    return render_template('photos.html', photos=photos), 200


# Error Handling
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


"""
@login_manager.unauthorized_handler
def unauthorized():
    save_log({'status': 401, 'message': 'Unauthorized'})
    abort(401)
"""

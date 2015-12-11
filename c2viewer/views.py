# -*- coding: utf-8 -*-

import subprocess
from flask import render_template, jsonify, request, redirect, send_from_directory
from c2viewer import app
from flask.ext.stormpath import login_required, groups_required
from stormpath.client import Client


@app.route('/robots.txt')
@app.route('/sitemap.xml')
def robots():
    return send_from_directory(app.static_folder, request.path[1:])


@app.route('/')
def index():
    return redirect('/panama'), 301


@app.route('/cnl')
@login_required
@groups_required(['pacgeo', 'cnl'], all=False)
def cnl():
    client = Client()
    group = client.groups.get(app.config['STORMPATH_GROUPS']['cnl'])
    return render_template('map.html', custom_data=group.custom_data), 200


@app.route('/panama')
@login_required
@groups_required(['pacgeo', 'panama'], all=False)
def panama():
    client = Client()
    group = client.groups.get(app.config['STORMPATH_GROUPS']['panama'])
    return render_template('map.html', custom_data=group.custom_data), 200


@app.route("/hooks/github", methods=['POST', 'GET'])
def hooks():
    if bool(request.method == 'POST' and 'GitHub-Hookshot' in request.headers['User-Agent']):
        subprocess.call(['make', 'publish'])
    return jsonify({'message': 'Hook push from Github'})


@app.errorhandler(404)
def page_not_found(e):
    return render_template('errors/404.html'), 404


@app.errorhandler(401)
def page_unauthorized(e):
    return render_template('errors/401.html'), 401


@app.errorhandler(500)
def page_not_implemented(e):
    return render_template('errors/500.html'), 500

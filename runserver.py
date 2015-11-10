# -*- coding: utf-8 -*-

from web import app
import sys

if sys.argv[-1] == 'publish':
    app.run(host='0.0.0.0', port=80)
else:
    app.run(debug=True)

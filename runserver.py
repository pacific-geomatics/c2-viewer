# -*- coding: utf-8 -*-

from c2viewer import app
import sys

if sys.argv[-1] == 'publish':
    app.run(host='0.0.0.0', port=80)
else:
    app.run(host='127.0.0.1', port=8000, debug=True)

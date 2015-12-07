# -*- coding: utf-8 -*-
from datetime import timedelta

TESTING = False
PREFERRED_URL_SCHEME = 'https'
# SERVER_NAME = 'c2viewer.pacgeo.com'
SECRET_KEY = '4hLAJ6ZM9I4fL3lTu-PNNgMI'
APPLICATION_NAME = 'c2viewer'
MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoicGFjZ2VvIiwiYSI6ImE2ZmE3YTQyNmRjNTVmYTAxMWE2YWZlNGFjZjMzZWVhIn0.wRU0txw3VIEOVtyc8PCYdQ'
BASE_TEMPLATE = 'base.html'
STORMPATH_API_KEY_FILE = 'apiKey.properties'
STORMPATH_APPLICATION = APPLICATION_NAME
STORMPATH_COOKIE_DURATION = timedelta(minutes=30)
STORMPATH_REDIRECT_URL = '/map'
STORMPATH_ENABLE_USERNAME = True
STORMPATH_REQUIRE_USERNAME = False
STORMPATH_LOGIN_TEMPLATE = 'login.html'
STORMPATH_REGISTRATION_TEMPLATE = 'register.html'
STORMPATH_ENABLE_FORGOT_PASSWORD = True
STORMPATH_BASE_TEMPLATE = 'base.html'
STORMPATH_ENABLE_GOOGLE = True
STORMPATH_SOCIAL = {
    'GOOGLE': {
        'client_id': '451432892286-63p5qv006mqrdbvut2l4oibsnfrlod3k.apps.googleusercontent.com',
        'client_secret': '3CEITeOHg6gpZQUAEyUH3BH_',
        'redirect_uri': 'https://c2viewer.pacgeo.com/google'
    }
}


init:
    pip install -r requirements.txt

publish:
    git pull origin master
    kill -HUP $(cat run/gunicorn/pid)
    gunicorn --pid run/gunicorn/pid -w 4 c2viewer:app

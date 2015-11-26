init:
	pip install -r requirements.txt

publish:
	git pull origin master
	gunicorn --pid run/gunicorn/pid -w 4 c2viewer:app &

stop:
	PID=$(cat run/gunicorn/pid)
	kill -TERM $PID
